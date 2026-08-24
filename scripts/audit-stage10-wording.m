#import <AppKit/AppKit.h>
#import <CommonCrypto/CommonDigest.h>
#import <Foundation/Foundation.h>
#import <Vision/Vision.h>

static NSString *CSV(NSString *value) {
    if ([value rangeOfCharacterFromSet:[NSCharacterSet characterSetWithCharactersInString:@",\"\n"]].location == NSNotFound) {
        return value;
    }
    return [NSString stringWithFormat:@"\"%@\"", [value stringByReplacingOccurrencesOfString:@"\"" withString:@"\"\""]];
}

static NSString *SHA256(NSString *value) {
    NSData *data = [value dataUsingEncoding:NSUTF8StringEncoding];
    unsigned char digest[CC_SHA256_DIGEST_LENGTH];
    CC_SHA256(data.bytes, (CC_LONG)data.length, digest);
    NSMutableString *result = [NSMutableString stringWithCapacity:CC_SHA256_DIGEST_LENGTH * 2];
    for (NSInteger index = 0; index < CC_SHA256_DIGEST_LENGTH; index += 1) {
        [result appendFormat:@"%02x", digest[index]];
    }
    return result;
}

static NSString *RecogniseText(NSURL *imageURL, NSError **error) {
    NSImage *image = [[NSImage alloc] initWithContentsOfURL:imageURL];
    CGRect rect = CGRectMake(0, 0, image.size.width, image.size.height);
    CGImageRef cgImage = [image CGImageForProposedRect:&rect context:nil hints:nil];
    if (cgImage == nil) {
        if (error != NULL) *error = [NSError errorWithDomain:@"Stage10OCR" code:1 userInfo:@{NSLocalizedDescriptionKey: @"Unable to read image"}];
        return nil;
    }

    VNRecognizeTextRequest *request = [[VNRecognizeTextRequest alloc] init];
    request.recognitionLevel = VNRequestTextRecognitionLevelFast;
    request.usesLanguageCorrection = YES;
    request.recognitionLanguages = @[@"en-GB"];
    VNImageRequestHandler *handler = [[VNImageRequestHandler alloc] initWithCGImage:cgImage options:@{}];
    if (![handler performRequests:@[request] error:error]) return nil;

    NSMutableArray<NSString *> *lines = [NSMutableArray array];
    for (VNRecognizedTextObservation *observation in request.results) {
        VNRecognizedText *candidate = [[observation topCandidates:1] firstObject];
        if (candidate != nil) [lines addObject:candidate.string];
    }
    return [lines componentsJoinedByString:@"\n"];
}

int main(void) {
    @autoreleasepool {
        NSFileManager *fileManager = [NSFileManager defaultManager];
        NSURL *root = [NSURL fileURLWithPath:fileManager.currentDirectoryPath];
        NSURL *imageDirectory = [root URLByAppendingPathComponent:@"web/assets/diagrams/stage10-infographics"];
        NSURL *outputURL = [root URLByAppendingPathComponent:@"audits/stage10-ocr-wording.csv"];
        NSArray<NSString *> *patterns = @[
            @"\\bCIE-style\\b", @"\\bcommon trap\\b", @"\\bexam trap\\b", @"\\bmark trap\\b",
            @"\\bsame name trap\\b", @"\\bphone number trap\\b", @"\\btrap\\b",
            @"\\bmagic(?:al|ally)?\\b", @"\\bvibes\\b", @"\\bbuzzword\\b", @"\\bdramatic\\b",
            @"\\bmental toolbox\\b", @"\\bfancy synonym\\b", @"\\bpersonality trait\\b",
            @"\\bgoldfish\\b", @"\\bpaperweight\\b", @"\\brevision fog\\b"
        ];
        NSMutableArray<NSRegularExpression *> *expressions = [NSMutableArray array];
        for (NSString *pattern in patterns) {
            [expressions addObject:[NSRegularExpression regularExpressionWithPattern:pattern options:NSRegularExpressionCaseInsensitive error:nil]];
        }

        NSError *directoryError = nil;
        NSArray<NSURL *> *contents = [fileManager contentsOfDirectoryAtURL:imageDirectory includingPropertiesForKeys:nil options:NSDirectoryEnumerationSkipsHiddenFiles error:&directoryError];
        if (contents == nil) {
            fprintf(stderr, "%s\n", directoryError.localizedDescription.UTF8String);
            return 1;
        }
        NSArray<NSURL *> *images = [[contents filteredArrayUsingPredicate:[NSPredicate predicateWithBlock:^BOOL(NSURL *url, NSDictionary *bindings) {
            return [url.pathExtension.lowercaseString isEqualToString:@"jpg"];
        }]] sortedArrayUsingComparator:^NSComparisonResult(NSURL *left, NSURL *right) {
            return [left.lastPathComponent compare:right.lastPathComponent];
        }];

        NSMutableArray<NSString *> *rows = [NSMutableArray arrayWithObject:@"file,status,ocr_sha256,issue,ocr_text"];
        __block NSInteger flagged = 0;
        [images enumerateObjectsUsingBlock:^(NSURL *imageURL, NSUInteger index, BOOL *stop) {
            @autoreleasepool {
                NSError *recognitionError = nil;
                NSString *text = RecogniseText(imageURL, &recognitionError);
                if (text == nil) {
                    flagged += 1;
                    [rows addObject:[@[CSV(imageURL.lastPathComponent), @"OCR failed", @"", CSV(recognitionError.localizedDescription), @""] componentsJoinedByString:@","]];
                } else {
                    NSMutableSet<NSString *> *matches = [NSMutableSet set];
                    NSRange range = NSMakeRange(0, text.length);
                    for (NSRegularExpression *expression in expressions) {
                        for (NSTextCheckingResult *match in [expression matchesInString:text options:0 range:range]) {
                            [matches addObject:[[text substringWithRange:match.range] lowercaseString]];
                        }
                    }
                    NSString *issue = [[[matches allObjects] sortedArrayUsingSelector:@selector(compare:)] componentsJoinedByString:@"; "];
                    NSString *status = issue.length == 0 ? @"Clear" : @"Review needed";
                    if (issue.length != 0) flagged += 1;
                    NSString *flatText = [text stringByReplacingOccurrencesOfString:@"\n" withString:@" | "];
                    [rows addObject:[@[CSV(imageURL.lastPathComponent), status, SHA256(text), CSV(issue), CSV(flatText)] componentsJoinedByString:@","]];
                }
                if ((index + 1) % 50 == 0 || index + 1 == images.count) {
                    printf("OCR audited %lu/%lu\n", (unsigned long)(index + 1), (unsigned long)images.count);
                    fflush(stdout);
                }
            }
        }];

        NSString *output = [[rows componentsJoinedByString:@"\n"] stringByAppendingString:@"\n"];
        NSError *writeError = nil;
        if (![output writeToURL:outputURL atomically:YES encoding:NSUTF8StringEncoding error:&writeError]) {
            fprintf(stderr, "%s\n", writeError.localizedDescription.UTF8String);
            return 1;
        }
        printf("Stage 10 OCR wording audit complete: %lu images, %ld requiring review.\n", (unsigned long)images.count, (long)flagged);
    }
    return 0;
}
