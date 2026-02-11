import { PrismaClient } from '@prisma/client';

type SeedDish = {
  name: string;
  description: string;
  priceCents: number;
  imageUrl?: string;
  isAvailable?: boolean;
};

type SeedRestaurant = {
  name: string;
  description: string;
  cuisineType: string;
  priceLevel: number;
  rating: number;
  address: string;
  city: string;
  lat: number;
  lng: number;
  dishes: SeedDish[];
};

const restaurantsSeed: SeedRestaurant[] = [
  {
    name: 'Bistrot Montmartre',
    description: 'Cuisine française de quartier avec produits de saison.',
    cuisineType: 'French',
    priceLevel: 3,
    rating: 4.7,
    address: '12 Rue des Abbesses, 75018 Paris',
    city: 'Paris',
    lat: 48.8852,
    lng: 2.3386,
    dishes: [
      { name: 'Bœuf bourguignon', description: 'Bœuf mijoté 8h, carottes, purée maison.', priceCents: 1890 },
      { name: 'Croque truffe', description: 'Pain de campagne, jambon blanc, crème truffée.', priceCents: 1290 },
      { name: 'Salade chèvre chaud', description: 'Toast chèvre, noix, miel, jeunes pousses.', priceCents: 1090 },
      { name: 'Quiche lorraine', description: 'Lardons fumés, crème fermière.', priceCents: 990 },
      { name: 'Mousse au chocolat', description: 'Mousse intense 70%, éclats noisette.', priceCents: 650 },
      { name: 'Tarte tatin', description: 'Pommes caramélisées, crème crue.', priceCents: 690 }
    ]
  },
  {
    name: 'Roma Trastevere',
    description: 'Spécialités romaines, pâtes fraîches et pizzas napolitaines.',
    cuisineType: 'Italian',
    priceLevel: 2,
    rating: 4.6,
    address: '22 Rue du Faubourg Saint-Denis, 75010 Paris',
    city: 'Paris',
    lat: 48.8726,
    lng: 2.3542,
    dishes: [
      { name: 'Rigatoni alla carbonara', description: 'Guanciale, pecorino romano, œuf.', priceCents: 1450 },
      { name: 'Pizza Margherita', description: 'Tomate San Marzano, fior di latte, basilic.', priceCents: 1190 },
      { name: 'Pizza Diavola', description: 'Spianata piquante, mozzarella, olives.', priceCents: 1390 },
      { name: 'Lasagnes maison', description: 'Bolognaise lente, béchamel légère.', priceCents: 1490 },
      { name: 'Tiramisu classique', description: 'Mascarpone, café arabica, cacao.', priceCents: 690 },
      { name: 'Arancini', description: 'Boulettes de riz farcies à la mozzarella.', priceCents: 790 }
    ]
  },
  {
    name: 'Sakura Bento',
    description: 'Bento japonais et donburi préparés minute.',
    cuisineType: 'Japanese',
    priceLevel: 2,
    rating: 4.5,
    address: '8 Rue de la Michodière, 75002 Paris',
    city: 'Paris',
    lat: 48.8704,
    lng: 2.3318,
    dishes: [
      { name: 'Chicken Katsu Curry', description: 'Poulet pané, curry japonais doux, riz.', priceCents: 1390 },
      { name: 'Saumon Teriyaki', description: 'Saumon laqué, légumes sautés, riz vinaigré.', priceCents: 1590 },
      { name: 'Gyozas porc', description: '6 pièces grillées, sauce soja-sésame.', priceCents: 790 },
      { name: 'Donburi bœuf', description: 'Bœuf émincé, oignons doux, œuf onsen.', priceCents: 1490 },
      { name: 'Miso ramen', description: 'Bouillon miso, nouilles, maïs, pak choï.', priceCents: 1350 },
      { name: 'Mochis assortis', description: '3 parfums: matcha, yuzu, sésame noir.', priceCents: 590 }
    ]
  },
  {
    name: 'Beirut Express',
    description: 'Cuisine libanaise généreuse, grillades et mezzés.',
    cuisineType: 'Lebanese',
    priceLevel: 2,
    rating: 4.8,
    address: '5 Avenue de la République, 92300 Levallois-Perret',
    city: 'Levallois-Perret',
    lat: 48.8928,
    lng: 2.287,
    dishes: [
      { name: 'Assiette chawarma poulet', description: 'Poulet mariné, riz vermicelles, pickles.', priceCents: 1290 },
      { name: 'Mix mezzé', description: 'Houmous, moutabal, taboulé, falafels.', priceCents: 1490 },
      { name: 'Kafta grillée', description: 'Bœuf haché aux épices, pain pita.', priceCents: 1390 },
      { name: 'Falafel bowl', description: 'Boulgour, crudités, sauce tahini.', priceCents: 1190 },
      { name: 'Batata harra', description: 'Pommes de terre citronnées piment doux.', priceCents: 650 },
      { name: 'Baklava pistache', description: 'Pâte filo, sirop léger, pistaches.', priceCents: 550 }
    ]
  },
  {
    name: 'Bombay Palace',
    description: 'Classiques indiens, cuisson tandoor et currys.',
    cuisineType: 'Indian',
    priceLevel: 2,
    rating: 4.4,
    address: '41 Rue Jean Jaurès, 92800 Puteaux',
    city: 'Puteaux',
    lat: 48.8842,
    lng: 2.2382,
    dishes: [
      { name: 'Butter Chicken', description: 'Poulet tandoori, sauce tomate-crème.', priceCents: 1490 },
      { name: 'Palak Paneer', description: 'Fromage indien, purée d’épinards épicée.', priceCents: 1290 },
      { name: 'Biryani agneau', description: 'Riz basmati safrané, agneau fondant.', priceCents: 1590 },
      { name: 'Naan fromage', description: 'Pain chaud au tandoor, cœur fondant.', priceCents: 390 },
      { name: 'Samosas légumes', description: '2 pièces, sauce menthe tamarin.', priceCents: 590 },
      { name: 'Lassi mangue', description: 'Yaourt frais et pulpe de mangue.', priceCents: 450 }
    ]
  },
  {
    name: 'El Mariachi',
    description: 'Street-food mexicaine: tacos, bowls et ceviche.',
    cuisineType: 'Mexican',
    priceLevel: 1,
    rating: 4.3,
    address: '17 Rue Gabriel Péri, 92120 Montrouge',
    city: 'Montrouge',
    lat: 48.8167,
    lng: 2.3202,
    dishes: [
      { name: 'Tacos al pastor', description: 'Porc mariné, ananas rôti, coriandre.', priceCents: 990 },
      { name: 'Burrito pollo', description: 'Poulet grillé, riz, haricots noirs, salsa.', priceCents: 1190 },
      { name: 'Quesadilla fromage', description: 'Tortilla blé, mélange cheddar-mozza.', priceCents: 890 },
      { name: 'Bowl veggie', description: 'Quinoa, avocat, maïs, pico de gallo.', priceCents: 1090 },
      { name: 'Ceviche de dorade', description: 'Citron vert, oignon rouge, piment doux.', priceCents: 1290 },
      { name: 'Churros', description: 'Sucre-cannelle, sauce chocolat.', priceCents: 590 }
    ]
  },
  {
    name: 'Athens Grill',
    description: 'Saveurs grecques et méditerranéennes.',
    cuisineType: 'Greek',
    priceLevel: 2,
    rating: 4.5,
    address: '14 Rue du Général Leclerc, 92130 Issy-les-Moulineaux',
    city: 'Issy-les-Moulineaux',
    lat: 48.8235,
    lng: 2.2731,
    dishes: [
      { name: 'Gyros poulet', description: 'Pain pita, tzatziki, tomates, frites.', priceCents: 1090 },
      { name: 'Moussaka', description: 'Aubergines, viande hachée, béchamel.', priceCents: 1390 },
      { name: 'Souvlaki porc', description: 'Brochettes grillées, salade grecque.', priceCents: 1290 },
      { name: 'Salade crétoise', description: 'Feta, concombre, olives kalamata.', priceCents: 990 },
      { name: 'Spanakopita', description: 'Feuilleté épinards-feta.', priceCents: 690 },
      { name: 'Yaourt grec miel', description: 'Noix torréfiées et miel de thym.', priceCents: 490 }
    ]
  },
  {
    name: 'Veggie Lab',
    description: 'Cuisine végétarienne créative et bowls protéinés.',
    cuisineType: 'Vegetarian',
    priceLevel: 2,
    rating: 4.9,
    address: '3 Place de la Libération, 93100 Montreuil',
    city: 'Montreuil',
    lat: 48.8636,
    lng: 2.4432,
    dishes: [
      { name: 'Bowl falafel quinoa', description: 'Falafels, quinoa rouge, houmous betterave.', priceCents: 1190 },
      { name: 'Burger portobello', description: 'Champignon grillé, cheddar végétal.', priceCents: 1290 },
      { name: 'Curry coco lentilles', description: 'Lentilles corail, riz basmati, coriandre.', priceCents: 1090 },
      { name: 'Tacos tofu chipotle', description: 'Tofu mariné, salsa mangue, chou rouge.', priceCents: 990 },
      { name: 'Salade detox', description: 'Chou kale, avocat, graines torréfiées.', priceCents: 950 },
      { name: 'Cheesecake vegan', description: 'Base amande-datte, coulis fruits rouges.', priceCents: 650 }
    ]
  }
];

async function seed(): Promise<void> {
  const prisma = new PrismaClient();

  try {
    for (const entry of restaurantsSeed) {
      const restaurant = await prisma.restaurant.upsert({
        where: {
          name_address: {
            name: entry.name,
            address: entry.address,
          },
        },
        create: {
          name: entry.name,
          description: entry.description,
          cuisineType: entry.cuisineType,
          priceLevel: entry.priceLevel,
          rating: entry.rating,
          address: entry.address,
          city: entry.city,
          lat: entry.lat,
          lng: entry.lng,
          isActive: true,
        },
        update: {
          description: entry.description,
          cuisineType: entry.cuisineType,
          priceLevel: entry.priceLevel,
          rating: entry.rating,
          city: entry.city,
          lat: entry.lat,
          lng: entry.lng,
          isActive: true,
        },
      });

      await prisma.dish.deleteMany({ where: { restaurantId: restaurant.id } });

      await prisma.dish.createMany({
        data: entry.dishes.map((dish) => ({
          restaurantId: restaurant.id,
          name: dish.name,
          description: dish.description,
          priceCents: dish.priceCents,
          imageUrl: dish.imageUrl ?? null,
          isAvailable: dish.isAvailable ?? true,
        })),
      });
    }

    console.log(`✅ Seed terminé: ${restaurantsSeed.length} restaurants insérés/mis à jour.`);
  } finally {
    await prisma.$disconnect();
  }
}

seed().catch((error: unknown) => {
  console.error('❌ Seed error', error);
  process.exit(1);
});
