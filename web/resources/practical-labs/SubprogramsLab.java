import java.util.Scanner;

public class SubprogramsLab {
    static boolean valid(int mark) {
        return mark >= 0 && mark <= 100;
    }

    static int add(int total, int mark) {
        total = total + mark;
        return total;
    }

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int total = 0;
        for (int count = 0; count < 3; count++) {
            int mark;
            do {
                mark = input.nextInt();
            } while (!valid(mark));
            total = add(total, mark);
        }
        System.out.println(total / 3.0);
    }
}
