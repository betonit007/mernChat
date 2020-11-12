
const randomColor = name => {
    let firstLetter = name.split('')[0].toUpperCase()

    switch (firstLetter) {
        case "A":
            return "aqua";

        case "B":    
            return "blue";

        case "C":
            return "cyan";
        case "D":
            return "green";
        case "E":
            return "red";
        case "F":
            return "orange";
        case "G":
            return "yellow";
        case "H":
            return "green";

        case "I":
            return "indigo";
            
        case "J":
            return "blue";

        case "K":
            return "keylime";

        case "L":
            return "purple";

        case "M":
            return "orange";

        case "N":
            return "violet";

        case "O":
            return "red";

        case "P":
            return "yellow";

        case "Q":
            return "green";

        case "R":
            return "blue";
        case "S":
            return "teal";

        case "T":
            return "turquoise";

        case "U":
            return "violet";

        case "V":
            return "tangerine";

        case "W":
            return "red";
        case "X":
            return "brown";

        case "Y":
            return "yellow";

        case "Z":
            return "green";

        default:
            return 'blue'
    }
}

export default randomColor
