export const baseURL = 'http://localhost:80/msc';

export const getMonthName = month => {
    switch (month) {
        case 0: return 'Ιανουάριος';
        case 1: return 'Φεβρουάριος';
        case 2: return 'Μάρτιος';
        case 3: return 'Απρήλιος';
        case 4: return 'Μάιος';
        case 5: return 'Ιούνιος';
        case 6: return 'Ιούλιος';
        case 7: return 'Άυγουστος';
        case 8: return 'Σεπτέμβριος';
        case 9: return 'Οκτώβριος';
        case 10: return 'Νοέμβριος';
        case 11: return 'Δεκέμβριος';
        default: return 'Άγνωστος Μήνας';
    }
};