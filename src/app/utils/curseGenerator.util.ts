const curses:string[] = [ 
    'boliviano',
    "peruano",
    "chileno",
    "cordobes",
    "tucumano",
    "riojano",
    "cabinero",
    "causa",
    "brazuca",
    "serrano",
    "comegatos",
    "rosarino",
    "porteño",
    "hijo de ",
    "forro",
    "puta",
    "negro",
    "negros",
    'ceviche',
    "abombado",
    "aborto",
    "abriboca",
    "afananciio",
    "agrandado",
    "alcachofa",
    "alcahuete",
    "alcaucil",
    "alucineta",
    "amargo",
    "amarrete",
    "analfabestia",
    "apichonado",
    "argolluda",
    "atorrante",
    "avivado",
    "baboso",
    "bagayo",
    "bagre",
    "bardero",
    "barrabrava",
    "batilana",
    "belinún",
    "berreta",
    "bestia",
    "bicho",
    "bobalicón",
    "bobo",
    "bochinchero",
    "bolacero",
    "bolche",
    "bolita",
    "bolsón",
    "boludo",
    "bombero",
    "borrado",
    "borrego",
    "bostero",
    "botón",
    "brasuca",
    "bruja",
    "buchón",
    "buenudo",
    "bufarrón",
    "buitre",
    "burrero",
    "burro",
    "cabecita (negra)",
    "cachivache",
    "cachuzo",
    "cagador",
    "cagón",
    "calentón",
    "calzonudo",
    "camelero",
    "camorrero",
    "cana",
    "capanga",
    "cararrota",
    "careta",
    "cargoso",
    "catrasca",
    "chabón",
    "chancho",
    "chanta",
    "chanta",
    "chantún",
    "cheto",
    "chicanero",
    "chicato ",
    "chinchudo",
    "choborra",
    "cholulao",
    "choro",
    "chorro",
    "choto",
    "chupacirios",
    "chupamedias",
    "chupasangre",
    "cipayo",
    "ciruja",
    "cobani",
    "coimero",
    "colifa",
    "colifato",
    "cometero",
    "comilón",
    "compadrito",
    "concheta",
    "conchudo",
    "conventillero",
    "copado",
    "cornudo",
    "cotorra",
    "crudo",
    "cuatrochi",
    "cucaracha",
    "cuida",
    "culiao",
    "culona",
    "enano",
    "enculado",
    "estupido",
    "facha",
    "facho",
    "falopero",
    "fanfa",
    "fanfarrón",
    "fatiga",
    "fayuto",
    "felpudo",
    "feto ",
    "forro",
    "franchute",
    "fulero",
    "fullero",
    "gallina",
    "ganso",
    "garca",
    "garronero",
    "gato",
    "gorila ",
    "grasa",
    "groncho"
];

function random(min:number, max:number):number
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getCurse() 
{
    let out:string = '';

    for (let i = 0; i < random(1, 5); i++)
    {
        out += curses[random(1, curses.length - 1)] + ' ';
    }
    return out;
}