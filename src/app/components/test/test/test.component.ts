<<<<<<< HEAD
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
import { DailyComponent } from '../../itinerary/daily/daily.component';
import { DailyPlan, Itinerary } from 'src/app/models/itinerary.model';
import { SummaryComponent } from '../../itinerary/summary/summary.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SaveItineraryDialogComponent } from '../../itinerary/save-itinerary-dialog/save-itinerary-dialog.component';
<<<<<<< HEAD
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
=======
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b

@Component({
  selector: 'app-test',
  standalone: true,
<<<<<<< HEAD
  imports: [
    DailyComponent,
    SummaryComponent,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
=======
  imports: [DailyComponent, SummaryComponent, MatButtonModule],
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent implements OnInit {
<<<<<<< HEAD
  itinerary!: Itinerary;

  constructor(
    
  ) {

  }


  ngOnInit(): void {
    
  }

  
=======

  itinerary!: Itinerary;

  constructor(private dialog: MatDialog) {
    this.itinerary = {
      cityName: 'Timisoara',
      countryName: 'Romania',
      latitude: 45.7489,
      longitude: 21.2087,
      tripLength: 5,
      startDate: '2024-07-22',
      endDate: '2024-07-26',
      budget: "Luxury",
      companion: 'Solo',
      dailyRecommendationsNumber: 2,
      summary:
        "Timisoara, often referred to as 'Little Vienna,' is a vibrant city in Romania known for its rich history, stunning architecture, and dynamic cultural scene. Over the course of your 5-day solo trip in July, you'll explore must-see attractions, savor exquisite local cuisine, and uncover hidden gems. From the grandeur of its historic squares to the charm of its hidden cafes, Timisoara offers a luxurious experience that caters to your interests. The city's culinary scene is a delightful blend of traditional Romanian dishes and modern gastronomy, ensuring a memorable dining experience. With its welcoming atmosphere and diverse attractions, Timisoara is the perfect destination for a sophisticated and enriching getaway.",
      schedule: [
        {
          day: 1,
          description:
            "Welcome to Timisoara! Begin your luxurious journey with a visit to Casa Bunicii, a renowned restaurant offering a taste of traditional Romanian cuisine with a modern twist. After a delightful meal, head to Union Square (Piata Unirii), one of the city's most iconic landmarks. This historic square is surrounded by beautiful Baroque buildings and is a perfect spot for a leisurely stroll. Enjoy the vibrant atmosphere and take in the stunning architecture. Your first day in Timisoara sets the tone for an unforgettable trip filled with cultural and culinary delights.",
          recommendations: [
            {
              name: 'Casa Bunicii 1',
              description:
                "Casa Bunicii is a top-rated restaurant in Timisoara, known for its exquisite take on traditional Romanian cuisine. The menu features a variety of dishes made from locally sourced ingredients, offering a modern twist on classic recipes. The elegant yet cozy ambiance makes it an ideal spot for a luxurious dining experience. The restaurant's commitment to quality and authenticity has earned it a reputation as one of the best places to enjoy Romanian food in the city.",
              id: 'ChIJOxih85xdRUcRRD7MnLYDdV0',
              location: {
                latitude: 45.7326038,
                longitude: 21.2201426,
              },
              content: {},
            },
            {
              name: 'Union Square',
              description:
                "Union Square is one of Timisoara's most beautiful and historic squares, surrounded by stunning Baroque buildings. The square is a vibrant hub of activity, with cafes, restaurants, and shops lining its perimeter. It's a perfect place for a leisurely stroll, offering a glimpse into the city's rich history and architectural heritage. The square often hosts cultural events and festivals, adding to its lively atmosphere. Don't miss the chance to relax and soak in the beauty of this iconic landmark.",
              id: 'ChIJCQMfxoFnRUcR4nt-HQ2w6i4',
              location: {
                latitude: 45.7579461,
                longitude: 21.2289772,
              },
              content: {},
            },
          ],
          color: '#3A30F2',
        },
        {
          day: 2,
          description:
            'On your second day, start with a visit to the Timisoara Orthodox Cathedral, a must-see attraction known for its impressive architecture and spiritual significance. After exploring the cathedral, treat yourself to a luxurious dining experience at Restaurant Merlot, a fine dining establishment offering a sophisticated menu and an extensive wine list. The combination of cultural exploration and gourmet cuisine ensures a memorable day in Timisoara.',
          recommendations: [
            {
              name: '"Three Holy Hierarchs" Metropolitan Cathedral',
              description:
                "The Timisoara Orthodox Cathedral is a stunning architectural masterpiece and a symbol of the city. Built in the early 20th century, the cathedral features a blend of Byzantine and Romanian architectural styles. Its impressive interior is adorned with beautiful frescoes and intricate woodwork. The cathedral is not only a place of worship but also a significant cultural landmark, offering visitors a glimpse into the city's religious heritage.",
              id: 'ChIJi_AdrXhdRUcR8NjoSndw16Y',
              location: {
                latitude: 45.750875099999995,
                longitude: 21.2243018,
              },
              content: {},
            },
            {
              name: 'Restaurant Merlot',
              description:
                "Restaurant Merlot is a premier fine dining destination in Timisoara, known for its sophisticated menu and elegant ambiance. The restaurant offers a diverse selection of gourmet dishes, crafted from the finest ingredients and paired with an extensive wine list. The luxurious setting and impeccable service make it a perfect choice for a special dining experience. Whether you're celebrating a special occasion or simply indulging in a night of culinary excellence, Restaurant Merlot promises an unforgettable meal.",
              id: 'ChIJQ_folnxnRUcRaUGJqFGZy7g',
              location: {
                latitude: 45.756436,
                longitude: 21.2419863,
              },
              content: {},
            },
          ],
          color: '#6D9A73',
        },
        {
          day: 3,
          description:
            "Discover Timisoara's hidden gems on your third day, starting with a visit to the Art Museum, located in the beautiful Baroque Palace. The museum houses an impressive collection of Romanian and European art, offering a cultural feast for art lovers. Afterward, enjoy a luxurious lunch at Restaurant Sabres, known for its innovative cuisine and stylish setting. This day combines artistic exploration with culinary indulgence, providing a well-rounded experience of Timisoara's cultural scene.",
          recommendations: [
            {
              name: 'Timișoara Art Museum',
              description:
                "Housed in the stunning Baroque Palace, the Art Museum in Timisoara boasts an extensive collection of Romanian and European art. The museum's exhibits span several centuries, showcasing works from the Renaissance to contemporary art. Highlights include pieces by renowned Romanian artists and an impressive collection of decorative arts. The museum's elegant setting and diverse collection make it a must-visit for art enthusiasts.",
              id: 'ChIJN5Kj04FnRUcRGfyGn04TLEM',
              location: {
                latitude: 45.7574185,
                longitude: 21.2292928,
              },
              content: {},
            },
            {
              name: 'Restaurant Sabres',
              description:
                "Restaurant Sabres is a chic dining spot in Timisoara, celebrated for its innovative cuisine and stylish ambiance. The menu features a fusion of traditional and modern dishes, crafted with creativity and flair. The restaurant's elegant decor and attentive service create a luxurious dining experience. Whether you're enjoying a leisurely lunch or a sophisticated dinner, Restaurant Sabres offers a culinary journey that delights the senses.",
              id: 'ChIJeyA4w5FdRUcRFvqjW0DWDMo',
              location: {
                latitude: 45.7426643,
                longitude: 21.2382259,
              },
              content: {},
            },
          ],
          color: '#D32C8C',
        },
        {
          day: 4,
          description:
            "Immerse yourself in Timisoara's rich history with a visit to the Huniade Castle, the oldest building in the city. The castle houses the Banat Museum, offering fascinating exhibits on the region's history and culture. After your historical exploration, dine at Restaurant Caruso, a fine dining establishment known for its exquisite Italian cuisine and elegant atmosphere. This day blends historical discovery with gourmet dining, providing a deeper understanding of Timisoara's heritage.",
          recommendations: [
            {
              name: 'Castle of Huniade',
              description:
                "Huniade Castle is the oldest building in Timisoara, dating back to the 14th century. The castle now houses the Banat Museum, which offers a comprehensive look at the history and culture of the Banat region. Exhibits include archaeological finds, historical artifacts, and ethnographic displays. The castle's historic architecture and informative exhibits make it a fascinating destination for history buffs and cultural enthusiasts alike.",
              id: 'ChIJ5UFXKYBdRUcRqu0cpJka-0s',
              location: {
                latitude: 45.7530545,
                longitude: 21.2272262,
              },
              content: {},
            },
            {
              name: 'Restaurant Caruso',
              description:
                "Restaurant Caruso is a premier Italian dining destination in Timisoara, known for its refined cuisine and elegant setting. The menu features a selection of classic Italian dishes, prepared with the finest ingredients and presented with artistic flair. The restaurant's sophisticated ambiance and impeccable service make it an ideal choice for a luxurious dining experience. Whether you're savoring a multi-course meal or enjoying a glass of fine wine, Restaurant Caruso promises a memorable culinary journey.",
              id: 'ChIJ8znW5H9nRUcRn84mimQLY4w',
              location: {
                latitude: 45.755265900000005,
                longitude: 21.2293762,
              },
              content: {},
            },
          ],
          color: '#7D6585',
        },
        {
          day: 5,
          description:
            'Conclude your luxurious trip to Timisoara with a visit to the Botanical Park, a serene oasis in the heart of the city. Stroll through the beautifully landscaped gardens and enjoy the peaceful atmosphere. For your final meal, dine at Restaurant Casa del Sole, a top-rated establishment offering a blend of international and Romanian cuisine in a sophisticated setting. This day provides a relaxing and indulgent end to your Timisoara adventure, leaving you with lasting memories of this charming city.',
          recommendations: [
            {
              name: 'Botanic Park',
              description:
                "The Botanical Park in Timisoara is a tranquil retreat, offering beautifully landscaped gardens and a diverse collection of plant species. The park is a perfect place for a leisurely stroll, with winding paths, picturesque ponds, and shaded benches. It's an ideal spot to relax and enjoy nature's beauty, providing a peaceful escape from the city's hustle and bustle. The park's serene atmosphere and lush greenery make it a favorite destination for both locals and visitors.",
              id: 'ChIJ06xIU4FnRUcRpzfBJLlxBtw',
              location: {
                latitude: 45.7601963,
                longitude: 21.225301500000004,
              },
              content: {},
            },
            {
              name: 'Restaurant Casa del Sole',
              description:
                "Restaurant Casa del Sole is a top-rated dining establishment in Timisoara, known for its blend of international and Romanian cuisine. The menu features a variety of gourmet dishes, crafted with precision and creativity. The restaurant's elegant decor and refined ambiance create a luxurious dining experience. Whether you're enjoying a leisurely lunch or a sophisticated dinner, Casa del Sole offers a culinary journey that delights the palate and leaves a lasting impression.",
              id: 'ChIJa2FVbZ1dRUcRK52gznkvulY',
              location: {
                latitude: 45.744512199999996,
                longitude: 21.2213283,
              },
              content: {},
            },
          ],
          color: '#9605BF',
        },
      ],
    };
  }

  destination: string = 'London';
  tripLength: number = 3;
  text: string = `Error magnam maiores voluptatem iure incidunt facere quaerat voluptates quas repellendus, cum laboriosam dolore autem accusamus voluptate libero aspernatur doloribus doloremque, perferendis sed. Unde modi vero harum maiores, ducimus doloremque!
Harum, quis eos tempore sunt minus, saepe, maiores sequi perferendis velit quidem soluta consequatur praesentium accusamus adipisci. Cumque, incidunt? Quae, expedita asperiores. Aliquid provident maxime pariatur officia consectetur? Pariatur, architecto!
Commodi corporis doloremque nostrum velit quos odit earum excepturi quae natus eius debitis, et, aliquid aliquam sapiente adipisci magnam pariatur possimus. Veritatis illo eligendi neque? Perferendis sint voluptas eligendi atque?
Molestias debitis veniam soluta inventore perferendis, corrupti rerum temporibus assumenda adipisci blanditiis suscipit dolores perspiciatis libero error aliquam enim facere quod quas, sint eum, odit illum quis. Eveniet, debitis nesciunt.
Repellat aut facere sequi magni enim temporibus quas similique explicabo vel quos libero quo ipsa voluptatem, perspiciatis aspernatur, vero, repellendus suscipit ex fugiat molestias architecto velit officia! Qui, dolorem sint.
Nisi dignissimos facere qui, consectetur adipisci sequi nesciunt, accusantium quia quidem id quo minima soluta deserunt repellendus sit repudiandae nulla totam ex. Iusto incidunt nobis corrupti aliquid, recusandae sunt ipsum.
Doloribus neque, at perspiciatis sed eaque dicta ab tempore. Libero repudiandae sunt autem excepturi perspiciatis, maxime quidem animi sit laborum? Aliquam quam aspernatur recusandae fuga modi iusto cumque animi cum.
Quae excepturi quia veritatis nostrum voluptas dolorum ullam, placeat tempore.`;

  dayPlan: DailyPlan = {
    day: 1,
    description:
      'Welcome to Munich, Germany! Get ready for an amazing day filled with must-see attractions and great food. To start your day off right, head over to Spatenhof, a fantastic eatery known for its delicious German cuisine. After enjoying a hearty meal, make your way to the iconic New Town Hall (Neus Rathaus), where you can marvel at the stunning architecture and take in panoramic views of the city. Next, satisfy your curiosity at the renowned Deutsches Museum, where you can explore fascinating exhibits on science and technology. For a delightful afternoon break, stop by Cafe 36, a charming café known for its delectable pastries and aromatic coffee. Finally, make your way to Marienplatz, the heart of Munich, to soak in the vibrant atmosphere and admire the historic buildings. Enjoy your first day in Munich!',
    recommendations: [
      {
        id: '1',
        location: { latitude: 0, longitude: 0 },
        name: 'Spatenhof',
        description:
          "A historic beer garden and restaurant in Munich, known for its traditional Bavarian cuisine and famous Spaten beer. Located near the central Marienplatz, it offers a cozy atmosphere with both indoor and outdoor seating. It's a popular spot for both locals and tourists to enjoy authentic German food and drink in a charming, rustic setting. The establishment also hosts seasonal events and live music, adding to its lively ambiance.",
      },
      {
        id: '2',
        location: { latitude: 0, longitude: 0 },
        name: 'New Town Hall (Neus Rathaus)',
        description:
          "An iconic Gothic Revival building in Marienplatz, Munich's central square. It houses the city government and features the famous Glockenspiel, which performs daily with life-sized figures reenacting historical events. Visitors can also take an elevator to the top of the tower for panoramic views of the city. The intricate facade and vibrant atmosphere make it a must-see landmark.",
      },
      {
        id: '3',
        location: { latitude: 0, longitude: 0 },
        name: 'Deutsches Museum',
        description:
          "The world's largest museum dedicated to science and technology, located on Museum Island in Munich. It features extensive exhibits on topics like aviation, space exploration, energy, and more. Interactive displays and hands-on activities make it engaging for visitors of all ages. The museum's historic aircraft and ship collections are particularly notable.",
      },
      {
        id: '4',
        location: { latitude: 0, longitude: 0 },
        name: 'Cafe 36',
        description:
          "A charming café located on the top floor of the Vorhoelzer Forum at the Technical University of Munich. It offers panoramic views of the city skyline and the Alps on clear days. Known for its relaxed atmosphere, it's an ideal spot for coffee, light meals, and pastries. The rooftop terrace is especially popular for enjoying the scenic vistas.",
      },
      {
        id: '5',
        location: { latitude: 0, longitude: 0 },
        name: 'Marienplatz',
        description:
          "Munich's central square and the heart of the city, bustling with activity and historical significance. It is home to the New Town Hall (Neues Rathaus) and its famous Glockenspiel, which performs daily. Surrounded by shops, restaurants, and cafes, Marienplatz is a prime spot for shopping and dining. The square often hosts markets, festivals, and public events, making it a lively and vibrant destination for visitors.",
      },
    ],
  };

 

  ngOnInit(): void {
    const dialogRef = this.dialog.open(SaveItineraryDialogComponent, {
      maxWidth: '1200px',
      maxHeight: '800px',
      width: '800px',
      height: '250px',
      data: {
        itinerary: this.itinerary
      },
    });
  }
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
}
