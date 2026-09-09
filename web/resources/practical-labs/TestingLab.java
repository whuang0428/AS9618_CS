import java.util.Scanner;

// Inputs are four already validated integer marks from 0 to 100.
public class TestingLab {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int passCount = 0;
        for (int index = 0; index < 4; index++) {
            int mark = input.nextInt();
            if (mark >= 50) {
                passCount++;
            }
        }
        System.out.println(passCount);
    }
}
