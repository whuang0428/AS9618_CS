import java.util.Scanner;

// Retain pass counting and additionally count merits at 70 and above.
public class TestingLab {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int passCount = 0;
        int meritCount = 0;
        for (int index = 0; index < 4; index++) {
            int mark = input.nextInt();
            if (mark >= 50) {
                passCount++;
            }
            if (mark >= 70) {
                meritCount++;
            }
        }
        System.out.println(passCount);
        System.out.println(meritCount);
    }
}
