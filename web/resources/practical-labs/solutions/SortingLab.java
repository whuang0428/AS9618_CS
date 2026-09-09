import java.util.Scanner;

public class SortingLab {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int[] values = new int[5];
        for (int index = 0; index < values.length; index++) {
            values[index] = input.nextInt();
        }
        int last = values.length - 1;
        boolean swapped = true;
        while (last > 0 && swapped) {
            swapped = false;
            for (int index = 0; index < last; index++) {
                if (values[index] < values[index + 1]) {
                    int temp = values[index];
                    values[index] = values[index + 1];
                    values[index + 1] = temp;
                    swapped = true;
                }
            }
            last--;
        }
        for (int value : values) {
            System.out.println(value);
        }
    }
}
