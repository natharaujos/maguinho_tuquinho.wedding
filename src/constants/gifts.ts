import { Price } from "../domain/Price";
import type { Gift } from "../store/giftSlice";

export const giftData: Gift[] = [
  {
    id: 1,
    title:
      "5 Toalhas de Banho Grande Algodão LAUNE HAUS Macia Alta Absorção (Pérola)",
    image: "https://m.media-amazon.com/images/I/614LkAPuueL._AC_UL320_.jpg",
    price: new Price(129.9).getSummary(),
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
  //   {
  //     id: 19,
  //     title: "Cortina para Sala",
  //     image:
  //       "https://images.unsplash.com/photo-1501183638714-8f3f5b5b1d3b?auto=format&fit=crop&w=800&q=80",
  //     price: 160.0,
  //   },
  //   {
  //     id: 20,
  //     title: "Cortador de Legumes",
  //     image:
  //       "https://images.unsplash.com/photo-1519923042532-2b50b8df5b88?auto=format&fit=crop&w=800&q=80",
  //     price: 45.0,
  //   },

  //   {
  //     id: 21,
  //     title: "Tapete para Sala",
  //     image:
  //       "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80",
  //     price: 120.0,
  //   },
  //   {
  //     id: 22,
  //     title: "Torradeira",
  //     image:
  //       "https://images.unsplash.com/photo-1519974719765-e6559eac2575?auto=format&fit=crop&w=800&q=80",
  //     price: 110.0,
  //   },
  //   {
  //     id: 23,
  //     title: "Aparelho de Som Bluetooth",
  //     image:
  //       "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=800&q=80",
  //     price: 180.0,
  //   },
  //   {
  //     id: 24,
  //     title: "Castiçal Decorativo",
  //     image:
  //       "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=800&q=80",
  //     price: 50.0,
  //   },
  //   {
  //     id: 25,
  //     title: "Garrafas Térmicas",
  //     image:
  //       "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80",
  //     price: 70.0,
  //   },
  //   {
  //     id: 26,
  //     title: "Jogo de Copos de Vidro",
  //     image:
  //       "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80",
  //     price: 65.0,
  //   },
  //   {
  //     id: 27,
  //     title: "Conjunto de Pratos Fundos",
  //     image:
  //       "https://images.unsplash.com/photo-1498575207490-7ee32f12a9b7?auto=format&fit=crop&w=800&q=80",
  //     price: 85.0,
  //   },
  //   {
  //     id: 28,
  //     title: "Cadeira Decorativa",
  //     image:
  //       "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80",
  //     price: 210.0,
  //   },
  //   {
  //     id: 29,
  //     title: "Faqueiro Completo",
  //     image:
  //       "https://images.unsplash.com/photo-1556910103-1e9f3eb88896?auto=format&fit=crop&w=800&q=80",
  //     price: 230.0,
  //   },
  //   {
  //     id: 30,
  //     title: "Cesto de Roupas",
  //     image:
  //       "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
  //     price: 70.0,
  //   },

  //   {
  //     id: 31,
  //     title: "Jogo de Panelas de Cerâmica",
  //     image:
  //       "https://images.unsplash.com/photo-1560448071-f9de48f3777e?auto=format&fit=crop&w=800&q=80",
  //     price: 490.0,
  //   },
  //   {
  //     id: 32,
  //     title: "Suporte para Livros",
  //     image:
  //       "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=800&q=80",
  //     price: 60.0,
  //   },
  //   {
  //     id: 33,
  //     title: "Aspirador de Pó Portátil",
  //     image:
  //       "https://images.unsplash.com/photo-1580202106214-1be1a9161c64?auto=format&fit=crop&w=800&q=80",
  //     price: 320.0,
  //   },
  //   {
  //     id: 34,
  //     title: "Jogo de Talheres",
  //     image:
  //       "https://images.unsplash.com/photo-1506619216599-9b7d95c2b33a?auto=format&fit=crop&w=800&q=80",
  //     price: 150.0,
  //   },
  //   {
  //     id: 35,
  //     title: "Abajur para Quarto",
  //     image:
  //       "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80",
  //     price: 80.0,
  //   },
  //   {
  //     id: 36,
  //     title: "Cortina Blackout",
  //     image:
  //       "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
  //     price: 190.0,
  //   },
  //   {
  //     id: 37,
  //     title: "Manta Decorativa",
  //     image:
  //       "https://images.unsplash.com/photo-1516627142053-2f0a70a1523b?auto=format&fit=crop&w=800&q=80",
  //     price: 130.0,
  //   },
  //   {
  //     id: 38,
  //     title: "Batedeira Planetária",
  //     image:
  //       "https://images.unsplash.com/photo-1586201375761-83865001f116?auto=format&fit=crop&w=800&q=80",
  //     price: 540.0,
  //   },
  //   {
  //     id: 39,
  //     title: "Jogo de Xícaras de Chá",
  //     image:
  //       "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80",
  //     price: 75.0,
  //   },
  //   {
  //     id: 40,
  //     title: "Tapete para Quarto",
  //     image:
  //       "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80",
  //     price: 90.0,
  //   },

  //   {
  //     id: 41,
  //     title: "Espremedor de Alho",
  //     image:
  //       "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=800&q=80",
  //     price: 40.0,
  //   },
  //   {
  //     id: 42,
  //     title: "Suporte para Temperos",
  //     image:
  //       "https://images.unsplash.com/photo-1510626176961-4b4d9a74c676?auto=format&fit=crop&w=800&q=80",
  //     price: 60.0,
  //   },
  //   {
  //     id: 43,
  //     title: "Kit de Jardinagem",
  //     image:
  //       "https://images.unsplash.com/photo-1501183638714-8f3f5b5b1d3b?auto=format&fit=crop&w=800&q=80",
  //     price: 150.0,
  //   },
  //   {
  //     id: 44,
  //     title: "Espelho de Mesa",
  //     image:
  //       "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
  //     price: 95.0,
  //   },
  //   {
  //     id: 45,
  //     title: "Jogo de Chá",
  //     image:
  //       "https://images.unsplash.com/photo-1541534401786-2610de92f7bb?auto=format&fit=crop&w=800&q=80",
  //     price: 120.0,
  //   },
  //   {
  //     id: 46,
  //     title: "Tábua de Corte",
  //     image:
  //       "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=800&q=80",
  //     price: 55.0,
  //   },
  //   {
  //     id: 47,
  //     title: "Jarra de Vidro",
  //     image:
  //       "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
  //     price: 45.0,
  //   },
  //   {
  //     id: 48,
  //     title: "Relógio Digital",
  //     image:
  //       "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
  //     price: 65.0,
  //   },
  //   {
  //     id: 49,
  //     title: "Cadeira de Escritório",
  //     image:
  //       "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80",
  //     price: 320.0,
  //   },
  //   {
  //     id: 50,
  //     title: "Espremedor de Laranja",
  //     image:
  //       "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  //     price: 85.0,
  //   },
];

export default giftData;
