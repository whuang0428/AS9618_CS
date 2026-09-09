import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

public class FilesLab {
    public static void main(String[] args) throws IOException {
        if (args.length != 2) {
            throw new IllegalArgumentException("Usage: java FilesLab source.txt new-copy.txt");
        }
        Path source = Path.of(args[0]);
        Path output = Path.of(args[1]);
        try (var reader = Files.newBufferedReader(source, StandardCharsets.UTF_8);
             var writer = Files.newBufferedWriter(output, StandardCharsets.UTF_8,
                     StandardOpenOption.CREATE_NEW, StandardOpenOption.WRITE)) {
            int count = 0;
            String line;
            while ((line = reader.readLine()) != null) {
                if (!line.isEmpty()) {
                    writer.write(line);
                    writer.newLine();
                    count++;
                }
            }
            System.out.println(count);
        }
    }
}
