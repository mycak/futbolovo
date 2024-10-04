import { EventCategoryEnum, Events } from "@/types/common";

export const mockedEvents: Events = [
  {
    id: "1",
    category: EventCategoryEnum.TOURNAMENT,
    location: {
      latitude: 52.2297,
      longitude: 21.0122,
      addressName: "Stadion Narodowy, Warszawa, ul. Włochata",
    },
    ageCategories: ["12", "14"],
    date: new Date("2024-11-15"),
    name: "Warszawski Turniej Piłkarski 1",
    price: 450,
    description: "Pierwszy turniej piłkarski w Warszawie.",
    phoneNumber: "+48123456789",
    email: "warszawa_turniej1@example.com",
    image: null,
  },
  {
    id: "2",
    category: EventCategoryEnum.TOURNAMENT,
    location: {
      latitude: 52.2297,
      longitude: 21.0122,
      addressName: "Stadion Narodowy, Warszawa, ul. Włochata",
    },
    ageCategories: ["10", "12"],
    date: new Date("2024-12-01"),
    name: "Warszawski Turniej Piłkarski 2",
    price: 480,
    description: "Drugi turniej piłkarski w Warszawie.",
    phoneNumber: "+48123456790",
    email: "warszawa_turniej2@example.com",
    image: null,
  },
  {
    id: "3",
    category: EventCategoryEnum.TOURNAMENT,
    location: {
      latitude: null,
      longitude: null,
      addressName: "Miejsce wydarzenia 1, Warszawa",
    },
    ageCategories: ["12", "14"],
    date: new Date("2024-11-20"),
    name: "Warszawski Turniej Piłkarski 3",
    price: 500,
    description: "Trzeci turniej piłkarski w Warszawie.",
    phoneNumber: "+48123456791",
    email: "warszawa_turniej3@example.com",
    image: null,
  },
  {
    id: "4",
    category: EventCategoryEnum.TOURNAMENT,
    location: {
      latitude: null,
      longitude: null,
      addressName: "Miejsce wydarzenia 2, Warszawa",
    },
    ageCategories: ["10", "12"],
    date: new Date("2024-12-05"),
    name: "Warszawski Turniej Piłkarski 4",
    price: 520,
    description: "Czwarty turniej piłkarski w Warszawie.",
    phoneNumber: "+48123456792",
    email: "warszawa_turniej4@example.com",
    image: null,
  },
  {
    id: "5",
    category: EventCategoryEnum.TOURNAMENT,
    location: {
      latitude: 52.4064,
      longitude: 16.9252,
      addressName: "Stadion Legii, Warszawa, ul. Sportowa",
    },
    ageCategories: ["12", "14"],
    date: new Date("2024-11-30"),
    name: "Warszawski Turniej Piłkarski 5",
    price: 530,
    description: "Piąty turniej piłkarski w Warszawie.",
    phoneNumber: "+48123456793",
    email: "warszawa_turniej5@example.com",
    image: null,
  },
  {
    id: "6",
    category: EventCategoryEnum.TOURNAMENT,
    location: {
      latitude: 52.3872,
      longitude: 20.1132,
      addressName: "Stadion Wisły, Warszawa, ul. Królewska",
    },
    ageCategories: ["10", "12"],
    date: new Date("2024-12-10"),
    name: "Warszawski Turniej Piłkarski 6",
    price: 540,
    description: "Szósty turniej piłkarski w Warszawie.",
    phoneNumber: "+48123456794",
    email: "warszawa_turniej6@example.com",
    image: null,
  },
  {
    id: "7",
    category: EventCategoryEnum.TOURNAMENT,
    location: {
      latitude: 52.1805,
      longitude: 21.0251,
      addressName: "Stadion Polonii, Warszawa, ul. Stadionowa",
    },
    ageCategories: ["12", "14"],
    date: new Date("2024-12-15"),
    name: "Warszawski Turniej Piłkarski 7",
    price: 550,
    description: "Siódmy turniej piłkarski w Warszawie.",
    phoneNumber: "+48123456795",
    email: "warszawa_turniej7@example.com",
    image: null,
  },
  {
    id: "8",
    category: EventCategoryEnum.TOURNAMENT,
    location: {
      latitude: 52.2285,
      longitude: 21.0092,
      addressName: "Stadion Znicza, Warszawa, ul. Znicza",
    },
    ageCategories: ["10", "12"],
    date: new Date("2024-12-20"),
    name: "Warszawski Turniej Piłkarski 8",
    price: 560,
    description: "Ósmy turniej piłkarski w Warszawie.",
    phoneNumber: "+48123456796",
    email: "warszawa_turniej8@example.com",
    image: null,
  },
  {
    id: "9",
    category: EventCategoryEnum.TOURNAMENT,
    location: {
      latitude: 52.2201,
      longitude: 21.017,
      addressName: "Stadion Warty, Warszawa, ul. Warty",
    },
    ageCategories: ["12", "14"],
    date: new Date("2024-12-25"),
    name: "Warszawski Turniej Piłkarski 9",
    price: 570,
    description: "Dziewiąty turniej piłkarski w Warszawie.",
    phoneNumber: "+48123456797",
    email: "warszawa_turniej9@example.com",
    image: null,
  },
  {
    id: "10",
    category: EventCategoryEnum.TOURNAMENT,
    location: {
      latitude: 52.2302,
      longitude: 21.0128,
      addressName: "Stadion Gwardii, Warszawa, ul. Gwardii",
    },
    ageCategories: ["10", "12"],
    date: new Date("2024-12-30"),
    name: "Warszawski Turniej Piłkarski 10",
    price: 580,
    description: "Dziesiąty turniej piłkarski w Warszawie.",
    phoneNumber: "+48123456798",
    email: "warszawa_turniej10@example.com",
    image: null,
  },
  {
    id: "50",
    category: EventCategoryEnum.CAMP,
    location: {
      latitude: 52.4064,
      longitude: 16.9252,
      addressName: "Oboz Piłkarski 1, Poznań, ul. Sportowa",
    },
    ageCategories: ["U10", "U12"],
    dateRange: [new Date("2024-06-10"), new Date("2024-06-20")],
    name: "Letni Oboz Piłkarski 1",
    price: 1200,
    description: "Oboz piłkarski dla dzieci w Poznaniu.",
    phoneNumber: "+48123456789",
    email: "oboz1@example.com",
    image: null,
  },
  {
    id: "51",
    category: EventCategoryEnum.CAMP,
    location: {
      latitude: 50.0614,
      longitude: 19.9383,
      addressName: "Oboz Piłkarski 2, Kraków, ul. Piłkarska",
    },
    ageCategories: ["U10", "U12", "U14"],
    dateRange: [new Date("2024-07-15"), new Date("2024-07-19")],
    name: "Letni Oboz Piłkarski 2",
    price: 1300,
    description: "Intensywne treningi w Krakowie.",
    phoneNumber: "+48123456790",
    email: "oboz2@example.com",
    image: null,
  },
  {
    id: "52",
    category: EventCategoryEnum.CAMP,
    location: {
      latitude: 51.1079,
      longitude: 17.0385,
      addressName: "Oboz Piłkarski 3, Wrocław, ul. Sportowa",
    },
    ageCategories: ["U8", "U10"],
    dateRange: [new Date("2024-08-05"), new Date("2024-08-12")],
    name: "Letni Oboz Piłkarski 3",
    price: 1250,
    description: "Zabawa i treningi w Wrocławiu.",
    phoneNumber: "+48123456791",
    email: "oboz3@example.com",
    image: null,
  },
  {
    id: "53",
    category: EventCategoryEnum.CAMP,
    location: {
      latitude: 54.352,
      longitude: 18.6466,
      addressName: "Oboz Piłkarski 4, Gdańsk, ul. Morska",
    },
    ageCategories: ["U12", "U14"],
    dateRange: [new Date("2024-10-10"), new Date("2024-08-17")],
    name: "Letni Oboz Piłkarski 4",
    price: 1400,
    description: "Oferujemy wspaniałe doświadczenia na plaży.",
    phoneNumber: "+48123456792",
    email: "oboz4@example.com",
    image: null,
  },
  {
    id: "54",
    category: EventCategoryEnum.CAMP,
    location: {
      latitude: null,
      longitude: null,
      addressName: "Oboz Piłkarski 5, Białystok, ul. Nieznana",
    },
    ageCategories: ["U10"],
    dateRange: [new Date("2024-10-12"), new Date("2024-08-20")],
    name: "Letni Oboz Piłkarski 5",
    price: 1100,
    description: "Oboz piłkarski dla dzieci w Białymstoku.",
    phoneNumber: "+48123456793",
    email: "oboz5@example.com",
    image: null,
  },
  {
    id: "55",
    category: EventCategoryEnum.CAMP,
    location: {
      latitude: 52.4297,
      longitude: 21.0122,
      addressName: "Oboz Piłkarski 6, Warszawa, ul. Sportowa",
    },
    ageCategories: ["U12", "U14"],
    dateRange: [new Date("2024-10-08"), new Date("2024-08-24")],
    name: "Letni Oboz Piłkarski 6",
    price: 1350,
    description: "Oboz w stolicy.",
    phoneNumber: "+48123456794",
    email: "oboz6@example.com",
    image: null,
  },
  {
    id: "56",
    category: EventCategoryEnum.CAMP,
    location: {
      latitude: 51.2465,
      longitude: 22.573,
      addressName: "Oboz Piłkarski 7, Lublin, ul. Sportowa",
    },
    ageCategories: ["U10", "U12"],
    dateRange: [new Date("2024-10-01"), new Date("2024-08-10")],
    name: "Letni Oboz Piłkarski 7",
    price: 1150,
    description: "Treningi w Lublinie.",
    phoneNumber: "+48123456795",
    email: "oboz7@example.com",
    image: null,
  },
  {
    id: "57",
    category: EventCategoryEnum.CAMP,
    location: {
      latitude: 50.0647,
      longitude: 19.945,
      addressName: "Oboz Piłkarski 8, Katowice, ul. Sportowa",
    },
    ageCategories: ["U14"],
    dateRange: [new Date("2024-10-02"), new Date("2024-08-14")],
    name: "Letni Oboz Piłkarski 8",
    price: 1280,
    description: "Zajęcia w Katowicach.",
    phoneNumber: "+48123456796",
    email: "oboz8@example.com",
    image: null,
  },
  {
    id: "58",
    category: EventCategoryEnum.CAMP,
    location: {
      latitude: null,
      longitude: null,
      addressName: "Oboz Piłkarski 9, Olsztyn, ul. Nieznana",
    },
    ageCategories: ["U10"],
    dateRange: [new Date("2024-10-04"), new Date("2024-08-14")],
    name: "Letni Oboz Piłkarski 9",
    price: 1050,
    description: "Letni oboz dla dzieci.",
    phoneNumber: "+48123456797",
    email: "oboz9@example.com",
    image: null,
  },
  {
    id: "59",
    category: EventCategoryEnum.CAMP,
    location: {
      latitude: 54.3723,
      longitude: 18.6382,
      addressName: "Oboz Piłkarski 10, Szczecin, ul. Sportowa",
    },
    ageCategories: ["U12", "U14"],
    dateRange: [new Date("2024-10-04"), new Date("2024-08-14")],
    name: "Letni Oboz Piłkarski 10",
    price: 1250,
    description: "Letni oboz piłkarski nad morzem.",
    phoneNumber: "+48123456798",
    email: "oboz10@example.com",
    image: null,
  },
  {
    id: "20",
    category: EventCategoryEnum.SERVICE,
    location: {
      latitude: 52.4084, // Poznań (inny punkt)
      longitude: 16.9342,
      addressName: "Sędzia Piłkarski, Poznań, ul. Sędziowska",
    },
    name: "Sędzia",
    price: 250,
    description: "Profesjonalny sędzia piłkarski w Poznaniu.",
    phoneNumber: "+48123456780",
    email: "referee1@example.com",
    image: null,
  },
  {
    id: "21",
    category: EventCategoryEnum.SERVICE,
    location: {
      latitude: 50.0637, // Kraków (inny punkt)
      longitude: 19.9445,
      addressName: "Fotograf Sportowy, Kraków, ul. Sportowa 1",
    },
    name: "Fotograf",
    price: 300,
    description: "Profesjonalna fotografia sportowa w Krakowie.",
    phoneNumber: "+48123456781",
    email: "photographer1@example.com",
    image: null,
  },
  {
    id: "22",
    category: EventCategoryEnum.SERVICE,
    location: {
      latitude: 51.1102, // Wrocław (inny punkt)
      longitude: 17.0383,
      addressName: "Wideo z Meczu, Wrocław, ul. Wideo 2",
    },
    name: "Wideo",
    price: 350,
    description: "Nagranie wideo z meczu we Wrocławiu.",
    phoneNumber: "+48123456782",
    email: "videographer1@example.com",
    image: null,
  },
  {
    id: "23",
    category: EventCategoryEnum.SERVICE,
    location: {
      latitude: 54.358, // Gdańsk (inny punkt)
      longitude: 18.646,
      addressName: "Puchary dla Zwycięzców, Gdańsk, ul. Pucharowa",
    },
    name: "Puchary",
    price: 400,
    description: "Produkcja pucharów dla zwycięzców w Gdańsku.",
    phoneNumber: "+48123456783",
    email: "trophy1@example.com",
    image: null,
  },
  {
    id: "120",
    category: EventCategoryEnum.SCHOOL,
    location: {
      latitude: 50.4084, // Słupsk
      longitude: 17.0382,
      addressName: "Dzień Sportu, Słupsk, ul. Szkolna 1",
    },
    date: new Date("2024-11-15"),
    name: "Dzień Sportu w Słupsku",
    price: 0,
    description: "Organizacja Dnia Sportu dla uczniów.",
    phoneNumber: "+48123456901",
    email: "school1@example.com",
    image: null,
  },
  {
    id: "121",
    category: EventCategoryEnum.SCHOOL,
    location: {
      latitude: 54.0741, // Elbląg
      longitude: 19.3926,
      addressName: "Zawody Sportowe, Elbląg, ul. Szkolna 2",
    },
    date: new Date("2024-11-20"),
    name: "Zawody Sportowe w Elblągu",
    price: 0,
    description: "Zawody dla szkół podstawowych.",
    phoneNumber: "+48123456902",
    email: "school2@example.com",
    image: null,
  },
  {
    id: "122",
    category: EventCategoryEnum.SCHOOL,
    location: {
      latitude: 53.9353, // Płock
      longitude: 19.7013,
      addressName: "Festyn Szkolny, Płock, ul. Szkolna 3",
    },
    date: new Date("2024-11-25"),
    name: "Festyn Szkolny w Płocku",
    price: 0,
    description: "Festyn z okazji Dnia Szkoły.",
    phoneNumber: "+48123456903",
    email: "school3@example.com",
    image: null,
  },
  {
    id: "123",
    category: EventCategoryEnum.SCHOOL,
    location: {
      latitude: 50.0252, // Stargard
      longitude: 15.0462,
      addressName: "Dzień Otwartej Szkoły, Stargard, ul. Szkolna 4",
    },
    date: new Date("2024-12-01"),
    name: "Dzień Otwartej Szkoły w Stargardzie",
    price: 0,
    description: "Dzień dla rodziców i uczniów.",
    phoneNumber: "+48123456904",
    email: "school4@example.com",
    image: null,
  },
  {
    id: "124",
    category: EventCategoryEnum.SCHOOL,
    location: {
      latitude: 50.4951, // Zgorzelec
      longitude: 15.0001,
      addressName: "Zawody Matematyczne, Zgorzelec, ul. Szkolna 5",
    },
    date: new Date("2024-12-05"),
    name: "Zawody Matematyczne w Zgorzelcu",
    price: 0,
    description: "Konkurs matematyczny dla uczniów szkół średnich.",
    phoneNumber: "+48123456905",
    email: "school5@example.com",
    image: null,
  },
  {
    id: "125",
    category: EventCategoryEnum.SCHOOL,
    location: {
      latitude: 50.6049, // Kędzierzyn-Koźle
      longitude: 18.2035,
      addressName: "Zawody Szkolne, Kędzierzyn-Koźle, ul. Szkolna 6",
    },
    date: new Date("2024-12-10"),
    name: "Zawody Szkolne w Kędzierzynie-Koźlu",
    price: 0,
    description: "Rozgrywki między szkołami.",
    phoneNumber: "+48123456906",
    email: "school6@example.com",
    image: null,
  },
  {
    id: "126",
    category: EventCategoryEnum.SCHOOL,
    location: {
      latitude: 50.8038, // Nowy Targ
      longitude: 20.027,
      addressName: "Dzień Wychowania Fizycznego, Nowy Targ, ul. Szkolna 7",
    },
    date: new Date("2024-12-15"),
    name: "Dzień Wychowania Fizycznego w Nowym Targu",
    price: 0,
    description: "Organizacja dnia sportowego.",
    phoneNumber: "+48123456907",
    email: "school7@example.com",
    image: null,
  },
  {
    id: "127",
    category: EventCategoryEnum.SCHOOL,
    location: {
      latitude: 51.0313, // Przemyśl
      longitude: 22.7734,
      addressName: "Konkurs Plastyczny, Przemyśl, ul. Szkolna 8",
    },
    date: new Date("2024-12-20"),
    name: "Konkurs Plastyczny w Przemyślu",
    price: 0,
    description: "Konkurs plastyczny dla uczniów.",
    phoneNumber: "+48123456908",
    email: "school8@example.com",
    image: null,
  },
  {
    id: "128",
    category: EventCategoryEnum.SCHOOL,
    location: {
      latitude: 52.658, // Sieradz
      longitude: 18.7783,
      addressName: "Dzień Języków Obcych, Sieradz, ul. Szkolna 9",
    },
    date: new Date("2024-12-25"),
    name: "Dzień Języków Obcych w Sieradzu",
    price: 0,
    description: "Dzień z językami obcymi dla uczniów.",
    phoneNumber: "+48123456909",
    email: "school9@example.com",
    image: null,
  },
  {
    id: "129",
    category: EventCategoryEnum.SCHOOL,
    location: {
      latitude: 51.0898, // Dąbrowa Górnicza
      longitude: 19.2232,
      addressName: "Konkurs Przyrodniczy, Dąbrowa Górnicza, ul. Szkolna 10",
    },
    date: new Date("2025-01-05"),
    name: "Konkurs Przyrodniczy w Dąbrowie Górniczej",
    price: 0,
    description: "Konkurs z wiedzy o przyrodzie.",
    phoneNumber: "+48123456910",
    email: "school10@example.com",
    image: null,
  },
  {
    id: "130",
    category: EventCategoryEnum.SCHOOL,
    location: {
      latitude: 51.3908, // Tarnobrzeg
      longitude: 21.6762,
      addressName: "Zawody Sportowe, Tarnobrzeg, ul. Szkolna 11",
    },
    date: new Date("2025-01-10"),
    name: "Zawody Sportowe w Tarnobrzegu",
    price: 0,
    description: "Wydarzenie dla szkół średnich.",
    phoneNumber: "+48123456911",
    email: "school11@example.com",
    image: null,
  },
  {
    id: "24",
    category: EventCategoryEnum.SERVICE,
    location: {
      latitude: 51.2465, // Lublin (inny punkt)
      longitude: 22.57,
      addressName: "Medale dla Zwycięzców, Lublin, ul. Medalowa",
    },
    name: "Medale",
    price: 180,
    description: "Produkcja medali dla zwycięzców w Lublinie.",
    phoneNumber: "+48123456784",
    email: "medal1@example.com",
    image: null,
  },
  {
    id: "25",
    category: EventCategoryEnum.SERVICE,
    location: {
      latitude: 50.0645, // Katowice (inny punkt)
      longitude: 19.947,
      addressName: "Sędzia Piłkarski, Katowice, ul. Sędziowska 2",
    },
    name: "Sędzia",
    price: 250,
    description: "Profesjonalny sędzia piłkarski w Katowicach.",
    phoneNumber: "+48123456785",
    email: "referee2@example.com",
    image: null,
  },
  {
    id: "26",
    category: EventCategoryEnum.SERVICE,
    location: {
      latitude: 54.366, // Szczecin (inny punkt)
      longitude: 14.538,
      addressName: "Fotograf Sportowy, Szczecin, ul. Sportowa 2",
    },
    name: "Fotograf",
    price: 300,
    description: "Profesjonalna fotografia sportowa w Szczecinie.",
    phoneNumber: "+48123456786",
    email: "photographer2@example.com",
    image: null,
  },
  {
    id: "27",
    category: EventCategoryEnum.SERVICE,
    location: {
      latitude: 52.424, // Poznań (inny punkt)
      longitude: 16.965,
      addressName: "Wideo z Meczu, Poznań, ul. Wideo 3",
    },
    name: "Wideo",
    price: 350,
    description: "Nagranie wideo z meczu w Poznaniu.",
    phoneNumber: "+48123456787",
    email: "videographer2@example.com",
    image: null,
  },
  {
    id: "28",
    category: EventCategoryEnum.SERVICE,
    location: {
      latitude: 51.159, // Zamość (inny punkt)
      longitude: 23.3,
      addressName: "Puchary dla Zwycięzców, Zamość, ul. Pucharowa 2",
    },
    name: "Puchary",
    price: 400,
    description: "Produkcja pucharów dla zwycięzców w Zamościu.",
    phoneNumber: "+48123456788",
    email: "trophy2@example.com",
    image: null,
  },
  {
    id: "29",
    category: EventCategoryEnum.SERVICE,
    location: {
      latitude: 50.8714, // Radom (inny punkt)
      longitude: 20.6168,
      addressName: "Medale dla Zwycięzców, Radom, ul. Medalowa 2",
    },
    name: "Medale",
    price: 180,
    description: "Produkcja medali dla zwycięzców w Radomiu.",
    phoneNumber: "+48123456789",
    email: "medal2@example.com",
    image: null,
  },
  {
    id: "70",
    category: EventCategoryEnum.LEAGUE,
    location: {
      latitude: 52.3906, // Wrocław (nowe współrzędne)
      longitude: 16.8979,
      addressName: "Turniej Sześciu Lig, Wrocław, ul. Turniejowa 1",
    },
    date: new Date("2024-09-15"),
    name: "Turniej Sześciu Lig 1",
    price: 200,
    description: "Rozgrywki dla drużyn w Wrocławiu.",
    phoneNumber: "+48123456790",
    email: "sixleague1@example.com",
    image: null,
  },
  {
    id: "71",
    category: EventCategoryEnum.LEAGUE,
    location: {
      latitude: 50.0645, // Katowice (nowe współrzędne)
      longitude: 19.945,
      addressName: "Turniej Sześciu Lig, Katowice, ul. Turniejowa 2",
    },
    date: new Date("2024-09-20"),
    name: "Turniej Sześciu Lig 2",
    price: 220,
    description: "Intensywne mecze w Katowicach.",
    phoneNumber: "+48123456791",
    email: "sixleague2@example.com",
    image: null,
  },
  {
    id: "72",
    category: EventCategoryEnum.LEAGUE,
    location: {
      latitude: 54.352, // Gdańsk (nowe współrzędne)
      longitude: 18.6465,
      addressName: "Turniej Sześciu Lig, Gdańsk, ul. Turniejowa 3",
    },
    date: new Date("2024-09-25"),
    name: "Turniej Sześciu Lig 3",
    price: 250,
    description: "Mecze ligowe w Gdańsku.",
    phoneNumber: "+48123456792",
    email: "sixleague3@example.com",
    image: null,
  },
  {
    id: "73",
    category: EventCategoryEnum.LEAGUE,
    location: {
      latitude: 51.1079, // Wrocław (nowe współrzędne)
      longitude: 17.0385,
      addressName: "Turniej Sześciu Lig, Wrocław, ul. Turniejowa 4",
    },
    date: new Date("2024-10-05"),
    name: "Turniej Sześciu Lig 4",
    price: 210,
    description: "Wspaniałe rozgrywki w Wrocławiu.",
    phoneNumber: "+48123456793",
    email: "sixleague4@example.com",
    image: null,
  },
  {
    id: "74",
    category: EventCategoryEnum.LEAGUE,
    location: {
      latitude: 52.2298, // Warszawa (nowe współrzędne)
      longitude: 21.0118,
      addressName: "Turniej Sześciu Lig, Warszawa, ul. Turniejowa 5",
    },
    date: new Date("2024-10-10"),
    name: "Turniej Sześciu Lig 5",
    price: 230,
    description: "Zawody w stolicy.",
    phoneNumber: "+48123456794",
    email: "sixleague5@example.com",
    image: null,
  },
  {
    id: "75",
    category: EventCategoryEnum.LEAGUE,
    location: {
      latitude: 50.0614, // Kraków (nowe współrzędne)
      longitude: 19.9383,
      addressName: "Turniej Sześciu Lig, Kraków, ul. Turniejowa 6",
    },
    date: new Date("2024-10-15"),
    name: "Turniej Sześciu Lig 6",
    price: 240,
    description: "Intensywne mecze w Krakowie.",
    phoneNumber: "+48123456795",
    email: "sixleague6@example.com",
    image: null,
  },
  {
    id: "76",
    category: EventCategoryEnum.LEAGUE,
    location: {
      latitude: 51.2465, // Lublin (nowe współrzędne)
      longitude: 22.573,
      addressName: "Turniej Sześciu Lig, Lublin, ul. Turniejowa 7",
    },
    date: new Date("2024-10-20"),
    name: "Turniej Sześciu Lig 7",
    price: 200,
    description: "Zawody w Lublinie.",
    phoneNumber: "+48123456796",
    email: "sixleague7@example.com",
    image: null,
  },
  {
    id: "77",
    category: EventCategoryEnum.LEAGUE,
    location: {
      latitude: 54.3723, // Szczecin (nowe współrzędne)
      longitude: 14.5376,
      addressName: "Turniej Sześciu Lig, Szczecin, ul. Turniejowa 8",
    },
    date: new Date("2024-10-25"),
    name: "Turniej Sześciu Lig 8",
    price: 210,
    description: "Zawody w Szczecinie.",
    phoneNumber: "+48123456797",
    email: "sixleague8@example.com",
    image: null,
  },
  {
    id: "78",
    category: EventCategoryEnum.LEAGUE,
    location: {
      latitude: 52.4064, // Poznań (nowe współrzędne)
      longitude: 16.9252,
      addressName: "Turniej Sześciu Lig, Poznań, ul. Turniejowa 9",
    },
    date: new Date("2024-11-01"),
    name: "Turniej Sześciu Lig 9",
    price: 220,
    description: "Wspaniałe rozgrywki w Poznaniu.",
    phoneNumber: "+48123456798",
    email: "sixleague9@example.com",
    image: null,
  },
  {
    id: "79",
    category: EventCategoryEnum.LEAGUE,
    location: {
      latitude: 52.2297, // Warszawa (nowe współrzędne)
      longitude: 21.0122,
      addressName: "Turniej Sześciu Lig, Warszawa, ul. Turniejowa 10",
    },
    date: new Date("2024-11-05"),
    name: "Turniej Sześciu Lig 10",
    price: 230,
    description: "Zawody w Warszawie.",
    phoneNumber: "+48123456799",
    email: "sixleague10@example.com",
    image: null,
  },
  {
    id: "80",
    category: EventCategoryEnum.LEAGUE,
    location: {
      latitude: 50.8709, // Radom (nowe współrzędne)
      longitude: 20.6222,
      addressName: "Turniej Sześciu Lig, Radom, ul. Turniejowa 11",
    },
    date: new Date("2024-11-10"),
    name: "Turniej Sześciu Lig 11",
    price: 210,
    description: "Zawody w Radomiu.",
    phoneNumber: "+48123456800",
    email: "sixleague11@example.com",
    image: null,
  },
  {
    id: "100",
    category: EventCategoryEnum.SPORT_FIELD,
    location: {
      latitude: 50.7333, // Bełchatów
      longitude: 19.3525,
      addressName: "Turniej Sportowy, Bełchatów, ul. Sportowa 1",
    },
    date: new Date("2024-09-15"),
    name: "Turniej Sportowy 1",
    price: 180,
    description: "Rozgrywki sportowe w Bełchatowie.",
    phoneNumber: "+48123456780",
    email: "sportfield1@example.com",
    image: null,
  },
  {
    id: "101",
    category: EventCategoryEnum.SPORT_FIELD,
    location: {
      latitude: 51.1852, // Kłodzko
      longitude: 16.6672,
      addressName: "Turniej Sportowy, Kłodzko, ul. Sportowa 2",
    },
    date: new Date("2024-09-20"),
    name: "Turniej Sportowy 2",
    price: 200,
    description: "Intensywne mecze w Kłodzku.",
    phoneNumber: "+48123456781",
    email: "sportfield2@example.com",
    image: null,
  },
  {
    id: "102",
    category: EventCategoryEnum.SPORT_FIELD,
    location: {
      latitude: 52.0258, // Kalisz
      longitude: 18.088,
      addressName: "Turniej Sportowy, Kalisz, ul. Sportowa 3",
    },
    date: new Date("2024-09-25"),
    name: "Turniej Sportowy 3",
    price: 220,
    description: "Mecze ligowe w Kaliszu.",
    phoneNumber: "+48123456782",
    email: "sportfield3@example.com",
    image: null,
  },
  {
    id: "103",
    category: EventCategoryEnum.SPORT_FIELD,
    location: {
      latitude: 50.9193, // Głogów
      longitude: 16.0835,
      addressName: "Turniej Sportowy, Głogów, ul. Sportowa 4",
    },
    date: new Date("2024-10-05"),
    name: "Turniej Sportowy 4",
    price: 210,
    description: "Wspaniałe rozgrywki w Głogowie.",
    phoneNumber: "+48123456783",
    email: "sportfield4@example.com",
    image: null,
  },
  {
    id: "104",
    category: EventCategoryEnum.SPORT_FIELD,
    location: {
      latitude: 51.2905, // Świdnica
      longitude: 16.4502,
      addressName: "Turniej Sportowy, Świdnica, ul. Sportowa 5",
    },
    date: new Date("2024-10-10"),
    name: "Turniej Sportowy 5",
    price: 230,
    description: "Zawody w Świdnicy.",
    phoneNumber: "+48123456784",
    email: "sportfield5@example.com",
    image: null,
  },
  {
    id: "105",
    category: EventCategoryEnum.SPORT_FIELD,
    location: {
      latitude: 50.0587, // Opole
      longitude: 17.9214,
      addressName: "Turniej Sportowy, Opole, ul. Sportowa 6",
    },
    date: new Date("2024-10-15"),
    name: "Turniej Sportowy 6",
    price: 240,
    description: "Intensywne mecze w Opolu.",
    phoneNumber: "+48123456785",
    email: "sportfield6@example.com",
    image: null,
  },
  {
    id: "106",
    category: EventCategoryEnum.SPORT_FIELD,
    location: {
      latitude: 51.25, // Zamość
      longitude: 23.2632,
      addressName: "Turniej Sportowy, Zamość, ul. Sportowa 7",
    },
    date: new Date("2024-10-20"),
    name: "Turniej Sportowy 7",
    price: 200,
    description: "Zawody w Zamościu.",
    phoneNumber: "+48123456786",
    email: "sportfield7@example.com",
    image: null,
  },
  {
    id: "107",
    category: EventCategoryEnum.SPORT_FIELD,
    location: {
      latitude: 50.282, // Lubin
      longitude: 16.2103,
      addressName: "Turniej Sportowy, Lubin, ul. Sportowa 8",
    },
    date: new Date("2024-10-25"),
    name: "Turniej Sportowy 8",
    price: 210,
    description: "Zawody w Lubinie.",
    phoneNumber: "+48123456787",
    email: "sportfield8@example.com",
    image: null,
  },
  {
    id: "108",
    category: EventCategoryEnum.SPORT_FIELD,
    location: {
      latitude: 51.1945, // Tczew
      longitude: 18.6062,
      addressName: "Turniej Sportowy, Tczew, ul. Sportowa 9",
    },
    date: new Date("2024-11-01"),
    name: "Turniej Sportowy 9",
    price: 220,
    description: "Wspaniałe rozgrywki w Tczewie.",
    phoneNumber: "+48123456788",
    email: "sportfield9@example.com",
    image: null,
  },
  {
    id: "109",
    category: EventCategoryEnum.SPORT_FIELD,
    location: {
      latitude: 50.5059, // Zgorzelec
      longitude: 15.0022,
      addressName: "Turniej Sportowy, Zgorzelec, ul. Sportowa 10",
    },
    date: new Date("2024-11-05"),
    name: "Turniej Sportowy 10",
    price: 230,
    description: "Zawody w Zgorzelcu.",
    phoneNumber: "+48123456789",
    email: "sportfield10@example.com",
    image: null,
  },
  {
    id: "110",
    category: EventCategoryEnum.SPORT_FIELD,
    location: {
      latitude: 51.0459, // Kołobrzeg
      longitude: 15.5736,
      addressName: "Turniej Sportowy, Kołobrzeg, ul. Sportowa 11",
    },
    date: new Date("2024-11-10"),
    name: "Turniej Sportowy 11",
    price: 210,
    description: "Zawody w Kołobrzegu.",
    phoneNumber: "+48123456900",
    email: "sportfield11@example.com",
    image: null,
  },
];
