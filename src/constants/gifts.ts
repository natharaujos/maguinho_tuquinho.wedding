import { Price } from "../domain/Price";
import type { Gift } from "../store/giftSlice";

export const giftData: Gift[] = [
  {
    id: 1,
    title:
      "5 Toalhas de Banho Grande Algodão LAUNE HAUS Macia Alta Absorção (Pérola)",
    image: "https://m.media-amazon.com/images/I/614LkAPuueL._AC_UL320_.jpg",
    price: new Price(0.01).getSummary(),
  },
  {
    id: 2,
    title: "Panela de Pressão Mecanica, 6L, Inox/Preto, 220v, Midea",
    image: "https://m.media-amazon.com/images/I/51XIBGrRxTL._AC_SL1000_.jpg",
    price: new Price(220.0).getSummary(),
  },
  {
    id: 3,
    title: "Aparelho de Jantar, Chá 20 peças Ryo Maresias TB",
    image: "https://m.media-amazon.com/images/I/51HjUseflNS._AC_UL320_.jpg",
    price: new Price(359.9).getSummary(),
  },
  {
    id: 4,
    title:
      "Cafeteira Elétrica 15 Xícaras Elgin Coffee Break Sistema Corta-pingos Preta 220V",
    image: "https://m.media-amazon.com/images/I/51dUZHS5pTL._AC_SL1097_.jpg",
    price: new Price(189.9).getSummary(),
  },
  {
    id: 5,
    title:
      "Kit para Cozinha 12 Peças com Jogo de Panelas Vermelho e Utensilios Tramontina Turim",
    image: "https://m.media-amazon.com/images/I/61fBewt4rkL._AC_SL1200_.jpg",
    price: new Price(449.9).getSummary(),
  },
  {
    id: 7,
    title: "Kit com 03 Luminarias Pendente Aramado Modelo Diamante (Preto)",
    image: "https://m.media-amazon.com/images/I/51Ahp4ButiL._AC_SL1000_.jpg",
    price: new Price(89.9).getSummary(),
  },
  {
    id: 8,
    title:
      "Relógio de Parede Silencioso Prata em Alumínio Decorativo Minimalista Preto Aço Escovado",
    image: "https://m.media-amazon.com/images/I/71xIa57yPQL._AC_SL1500_.jpg",
    price: new Price(119.9).getSummary(),
  },
  {
    id: 9,
    title:
      "Jogo De Lençol Cama Box King Size 4 Peças Percal 600 Fios Toque Macio Palha",
    image: "https://m.media-amazon.com/images/I/31TgkyHJ3aL._AC_.jpg",
    price: new Price(319.9).getSummary(),
  },
  {
    id: 10,
    title:
      "Vaso Decorativo Trio De Cerâmica 3 Unidades Decoração Sala Escritório Moderno (Preto)",
    image: "https://m.media-amazon.com/images/I/61EtP9uWiIL._AC_SL1080_.jpg",
    price: new Price(149.9).getSummary(),
  },
  {
    id: 11,
    title:
      "Frigideira Antiaderente, Base de Cerâmica, Cabo de Madeira, Frita Sem Óleo, Compatível Com Todos os Tipos de Fogões",
    image:
      "https://m.media-amazon.com/images/I/41r4i05AtKL.__AC_SX300_SY300_QL70_ML2_.jpg",
    price: new Price(129.9).getSummary(),
  },
  {
    id: 12,
    title: "Oster Torradeira Simple Life, 110V, Inox, 750W, OTOR600",
    image: "https://m.media-amazon.com/images/I/51xnI3C5AGL._AC_SL1000_.jpg",
    price: new Price(159.9).getSummary(),
  },
  {
    id: 13,
    title: "Liquidificador Oster 1400 Full, 3,2L, 110V, Preto, 1400W, OLIQ610",
    image: "https://m.media-amazon.com/images/I/51oF48-a1BL._AC_SL1000_.jpg",
    price: new Price(199.9).getSummary(),
  },
  {
    id: 14,
    title: "Espremedor Premium, Mondial, Preto, 30W, 220V - E-02",
    image: "https://m.media-amazon.com/images/I/71DEK6jSqGL._AC_SL1500_.jpg",
    price: new Price(59.9).getSummary(),
  },
  {
    id: 15,
    title:
      "Jogo de Facas Tramontina Plenus com Lâminas em Aço Inox e Cabos de Polipropileno Preto 10 Peças",
    image: "https://m.media-amazon.com/images/I/51gJh6NTr0L._AC_SL1200_.jpg",
    price: new Price(89.9).getSummary(),
  },
  {
    id: 16,
    title:
      "Assadeira Forma Retangular Antiaderente com Revestimento Interno 32, 37 ou 42 cm (42x29x5 cm)",
    image: "https://m.media-amazon.com/images/I/51cQ4Rp1B8L._AC_SL1200_.jpg",
    price: new Price(49.9).getSummary(),
  },
  {
    id: 18,
    title:
      "Espelho Decorativo Orgânico Lapidado 90x60 Moderno - com suporte para fixação",
    image: "https://m.media-amazon.com/images/I/71+s1ZVCiUL._AC_SL1500_.jpg",
    price: new Price(169.9).getSummary(),
  },
];

export const honeyMoonGifts = [
  // {
  //   id: 1,
  //   title: "Operação Lua de Mel - Café da Manhã Romântico",
  //   price: new Price(45.9).getSummary(),
  //   image: "https://i.postimg.cc/zGrx3pJJ/operacao-lua-mel.jpg",
  // },
  // {
  //   id: 2,
  //   title: "Operação Lua de Mel - Jantar à Luz de Velas",
  //   price: new Price(129.9).getSummary(),
  //   image: "https://i.postimg.cc/zGrx3pJJ/operacao-lua-mel.jpg",
  // },
  // {
  //   id: 3,
  //   title: "Operação Lua de Mel - Passeio Romântico",
  //   price: new Price(89.9).getSummary(),
  //   image: "https://i.postimg.cc/zGrx3pJJ/operacao-lua-mel.jpg",
  // },
  // {
  //   id: 4,
  //   title: "Operação Lua de Mel - Dia de Spa",
  //   price: new Price(149.9).getSummary(),
  //   image: "https://i.postimg.cc/zGrx3pJJ/operacao-lua-mel.jpg",
  // },
  // {
  //   id: 5,
  //   title: "Operação Lua de Mel - Momento Surpresa",
  //   price: new Price(69.9).getSummary(),
  //   image: "https://i.postimg.cc/zGrx3pJJ/operacao-lua-mel.jpg",
  // },
  {
    id: 99,
    title: "Operação Lua de Mel - Piquenique ao Ar Livre",
    price: new Price(59.9).getSummary(),
    image: "https://i.postimg.cc/zGrx3pJJ/operacao-lua-mel.jpg",
  },
  {
    id: 234,
    title: "Operação Lua de Mel - Cinema Privativo",
    price: new Price(99.5).getSummary(),
    image: "https://i.postimg.cc/zGrx3pJJ/operacao-lua-mel.jpg",
  },
  {
    id: 484,
    title: "Operação Lua de Mel - Aula de Dança a Dois",
    price: new Price(74.3).getSummary(),
    image: "https://i.postimg.cc/zGrx3pJJ/operacao-lua-mel.jpg",
  },
  {
    id: 342,
    title: "Operação Lua de Mel - Sessão de Massagem Relaxante",
    price: new Price(139.0).getSummary(),
    image: "https://i.postimg.cc/zGrx3pJJ/operacao-lua-mel.jpg",
  },
  {
    id: 423,
    title: "Operação Lua de Mel - Noite de Jogos e Diversão",
    price: new Price(49.7).getSummary(),
    image: "https://i.postimg.cc/zGrx3pJJ/operacao-lua-mel.jpg",
  },
];
