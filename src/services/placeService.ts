import prisma from "@/lib/prisma";
import { format } from "date-fns";

const mockPlaces = [
  { name: "Galata Kulesi", description: "Tarihin ve manzaranın buluştuğu nokta, İstanbul'un eşsiz panoramik manzarasını izleyebileceğiniz ikonik yapı.", imageUrl: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=1200" },
  { name: "Karaköy Güllüoğlu", description: "1800'lerden beri değişmeyen lezzet. İncecik yufkası ve bol fıstığıyla İstanbul'un tartışmasız en iyi baklavası.", imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerAbGnIH8Plx3eTzy9hUKpXvBJNmwoGBM0YWCQ8zThIoftm3wPNnxDnPiEL34iI-u-f3_0Ruxu9ZDbL32NqVSbD5hBuzv7s_OxCh-oVU3RAvj9bJpoIHdCrw_4P7IKcUYFjoZiZG9gtel0=s680-w680-h510-rw" },
  { name: "Moda Sahili", description: "Şehrin gürültüsünden uzak, gün batımını çimlerde oturup termosunuzdaki kahveyle izleyebileceğiniz huzurlu bir yürüyüş yolu.", imageUrl: "https://lh3.googleusercontent.com/p/AF1QipMSLYseplPW15GsRs5JZSyab8AbYJLRr0CozST2=s680-w680-h510-rw" },
  { name: "Topkapı Sarayı", description: "Tarihin derinliklerinde Osmanlı İmparatorluğu'nun izlerini keşfedin. Özellikle Kutsal Emanetler ve Harem dairesi büyüleyici.", imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqlDNVNKxD5sDl7z6JWxiKzY45-ht4RVEyyZi4LjIGaRj217EhVuXCzTKPuClm9K_WBjyX-ogjCUgu4Fmm5kOA9NtgjqbS8UpOEY6mTYamCC2KrEMJVZLmAQT8E0hbCyvI-w9Z7=s680-w680-h510-rw" },
  { name: "Ortaköy Meydanı", description: "Boğaz Köprüsü'nün ihtişamlı manzarasına karşı, meşhur kumpir ve waffle keyfi yapabileceğiniz cıvıl cıvıl bir meydan.", imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqxO6mWqLbPu7bEXNkqNhcHONbZzKiFDKM4H2ZBKNYzX_PRf3E1MtsxTEhx9rSGrPacD9U-JjD3_735pxJwnNbQx59HANUg183CQ2RxnGKuqtwfID9BUrpD5CtA_zbmxPvafBxB=s680-w680-h510-rw" },
  { name: "Yerebatan Sarnıcı", description: "Medusa başları ve loş ışıklarıyla kendinizi mistik bir masalın içinde hissedeceğiniz yeraltı sarayı. Restorasyon sonrası muazzam.", imageUrl: "https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=1200" },
  { name: "Kuzguncuk Sokakları", description: "Eski İstanbul ruhunu yaşatan, cumbalı rengarenk ahşap evleri ve samimi mahalle kültürüyle fotoğraf tutkunlarının gözdesi.", imageUrl: "https://cdn.villacim.com.tr/uploads/3840/779_kuzguncuk-gezilecek-yerler.jpg" },
  { name: "Pierre Loti Tepesi", description: "Haliç'in altın boynuz manzarasına karşı, tarihi kahvede Türk kahvenizi yudumlayıp derin düşüncelere dalabileceğiniz bir tepe.", imageUrl: "https://images.unsplash.com/photo-1610444583163-54cdff5339f4?q=80&w=1200" },
  { name: "Otağtepe Fatih Korusu", description: "Fatih Sultan Mehmet Köprüsü'ne kuşbakışı bakan, manzarasıyla nefes kesen doğa harikası saklı bir koru.", imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerghLEgxr62mlEoXWKX5l0F3PzMKD8pRBjRFIWo9SaQoPLPaMJSelFAuJrsypbcw_UXlrEceHh0BNa7d_QX9UfTjkjL9tdSz1JHbHVbS2VKw-swhWibmIOGEWWMQUtG6nJ8dTXe=s680-w680-h510-rw" },
  { name: "Kız Kulesi", description: "Denizin ortasında efsanelere konu olmuş zarif kule. Yıllardır aşıkların ve fotoğrafçıların bir numaralı ilham kaynağı.", imageUrl: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200" },
  { name: "Kapalıçarşı", description: "Dünyanın en eski ve en büyük kapalı çarşılarından biri. Rengarenk baharatlar, el dokuması halılar ve tarihin kokusu.", imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepBGl48-TLL_IgAJgoiko-b8n_P2OLgUPwz-Bfpf2I2a5nqJB8vxyo-UH2xN80UjUerK4Kv4DJJMGtCqgi_7zJA8jB8p-kKdJZKF0XXL-H51rpWjaLkXKA4CUyXpQbQchifBwrCnrEUxj0=s680-w680-h510-rw" },
  { name: "Belgrad Ormanı", description: "Hafta sonu doğa yürüyüşü, piknik ve taze hava için İstanbulluların kaçış noktası. Sonbaharda renk cümbüşü.", imageUrl: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1200" },
  { name: "Çamlıca Tepesi", description: "İstanbul'u en yüksekten izleyebileceğiniz eşsiz bir rüzgar ve manzara. Çay bahçesinde simit ve çay klasiktir.", imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepVohx4ey82YDdTkByXKGqMMP2prxx3KI1QkIuqBk8D1fjXhQEVsPaMZGak0CdoLELgE1EMPzjSn0pusPSf3dLr6s_WHUHd0smRx98Hooxp9olNRR_LRyVI0UmsT-L1nMh7LL16bA=s680-w680-h510-rw" },
  { name: "Süleymaniye Camii", description: "Mimar Sinan'ın kalfalık eseri. Sadece bir ibadethane değil, aynı zamanda akustiği ve peyzajıyla bir deha örneği.", imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwervgMYb8KoYjj-KPfVoEqxGfYbkHMBhzQWiQttotrMUhTwTAGLbmXKt3UHkWSD1By0zTnXkyAEWUGE8A6xHuc4sVCIuikmiMx-6QMjEt0hUSfVjpBJPAy9Ez0qr9oVIdsauKqZc=s680-w680-h510-rw" },
  { name: "Bebek Sahili", description: "Boğazın en elit semtlerinden birinde, sabah yürüyüşleri ve üzerine meşhur Bebek badem ezmesi eşliğinde lüks bir hafta sonu ritüeli.", imageUrl: "https://images.unsplash.com/photo-1606558661642-16781f33fcd9?q=80&w=1200" }
];

export async function getTodayPlace() {
  const todayStr = format(new Date(), "yyyy-MM-dd");
  let place = await prisma.place.findUnique({
    where: { recommendedOn: todayStr },
  });

  if (!place) {
    // Check if there are unrecommended places in our mock data
    const existingPlaces = await prisma.place.findMany({ select: { name: true } });
    const existingNames = new Set(existingPlaces.map((p: any) => p.name));
    
    let availablePlaces = mockPlaces.filter((p: any) => !existingNames.has(p.name));
    if (availablePlaces.length === 0) {
      // If all mock places are used, add a fallback generic place
      availablePlaces = [{
        name: `Gizli Cennet ${Math.floor(Math.random() * 1000)}`,
        description: "Keşfedilmeyi bekleyen harika bir mekan.",
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
      }];
    }

    const randomMock = availablePlaces[Math.floor(Math.random() * availablePlaces.length)];
    
    place = await prisma.place.create({
      data: {
        ...randomMock,
        recommendedOn: todayStr,
      }
    });
  }

  return place;
}

export async function votePlace(id: string, isUpvote: boolean) {
  const place = await prisma.place.findUnique({ where: { id } });
  if (!place) throw new Error("Mekan bulunamadı.");

  const updateData = isUpvote ? { upvotes: { increment: 1 } } : { downvotes: { increment: 1 } };
  
  return prisma.place.update({
    where: { id },
    data: updateData,
  });
}

export async function getLeaderboard() {
  return prisma.place.findMany({
    orderBy: [
      { upvotes: 'desc' },
      { downvotes: 'asc' }
    ],
    take: 10
  });
}

export async function getArchivedPlaces() {
  const todayStr = format(new Date(), "yyyy-MM-dd");
  return prisma.place.findMany({
    where: { recommendedOn: { lt: todayStr } },
    orderBy: { recommendedOn: 'desc' }
  });
}
