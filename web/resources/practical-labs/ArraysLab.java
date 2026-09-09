import java.util.Scanner;

// Enter six integers: two pupils, three tests each, in row order.
public class ArraysLab {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int[][] scores = new int[2][3];
        for (int row = 0; row < scores.length; row++) {
            int total = 0;
            for (int column = 0; column < scores[row].length; column++) {
                scores[row][column] = input.nextInt();
                total += scores[row][column];
            }
            System.out.println(total);
        }
    }
}
