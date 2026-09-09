import java.util.Scanner;

public class SubprogramsLab {
    static boolean valid(int mark) {
        return mark >= 0 && mark <= 100;
    }

    static int add(int total, int mark) {
        return total + mark;
    }

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int total = 0;
        int passed = 0;
        for (int count = 0; count < 3; count++) {
            int mark;
            do {
                mark = input.nextInt();
            } while (!valid(mark));
            total = add(total, mark);
            if (mark >= 50) {
                passed++;
            }
        }
        System.out.println(total / 3.0);
        System.out.println(passed);
    }
}
