import java.util.Scanner;

// Amended program: retain the matrix and output a separate total per test.
public class ArraysLab {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int[][] scores = new int[2][3];
        for (int row = 0; row < scores.length; row++) {
            for (int column = 0; column < scores[row].length; column++) {
                scores[row][column] = input.nextInt();
            }
        }
        for (int column = 0; column < scores[0].length; column++) {
            int total = 0;
            for (int row = 0; row < scores.length; row++) {
                total += scores[row][column];
            }
            System.out.println(total);
        }
    }
}
