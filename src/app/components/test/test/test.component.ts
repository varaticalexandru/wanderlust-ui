import { Component } from '@angular/core';
import { DailyComponent } from '../../itinerary/daily/daily.component';
import { DailyPlan } from 'src/app/models/itinerary.model';
import { SummaryComponent } from '../../itinerary/summary/summary.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    DailyComponent,
    SummaryComponent,
    MatButtonModule
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent {

  destination: string = "London";
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
        id: "1",
        location: {latitude: 0, longitude: 0},
        name: 'Spatenhof',
        description:
"A historic beer garden and restaurant in Munich, known for its traditional Bavarian cuisine and famous Spaten beer. Located near the central Marienplatz, it offers a cozy atmosphere with both indoor and outdoor seating. It's a popular spot for both locals and tourists to enjoy authentic German food and drink in a charming, rustic setting. The establishment also hosts seasonal events and live music, adding to its lively ambiance.",
      },
      {
        id: "2",
        location: {latitude: 0, longitude: 0},
        name: 'New Town Hall (Neus Rathaus)',
        description:
          "An iconic Gothic Revival building in Marienplatz, Munich's central square. It houses the city government and features the famous Glockenspiel, which performs daily with life-sized figures reenacting historical events. Visitors can also take an elevator to the top of the tower for panoramic views of the city. The intricate facade and vibrant atmosphere make it a must-see landmark.",
      },
      {
        id: "3",
        location: {latitude: 0, longitude: 0},
        name: 'Deutsches Museum',
        description:
          "The world's largest museum dedicated to science and technology, located on Museum Island in Munich. It features extensive exhibits on topics like aviation, space exploration, energy, and more. Interactive displays and hands-on activities make it engaging for visitors of all ages. The museum's historic aircraft and ship collections are particularly notable.",
      },
      {
        id: "4",
        location: {latitude: 0, longitude: 0},
        name: 'Cafe 36',
        description:
          "A charming café located on the top floor of the Vorhoelzer Forum at the Technical University of Munich. It offers panoramic views of the city skyline and the Alps on clear days. Known for its relaxed atmosphere, it's an ideal spot for coffee, light meals, and pastries. The rooftop terrace is especially popular for enjoying the scenic vistas.",
      },
      {
        id: "5",
        location: {latitude: 0, longitude: 0},
        name: 'Marienplatz',
        description:
          "Munich's central square and the heart of the city, bustling with activity and historical significance. It is home to the New Town Hall (Neues Rathaus) and its famous Glockenspiel, which performs daily. Surrounded by shops, restaurants, and cafes, Marienplatz is a prime spot for shopping and dining. The square often hosts markets, festivals, and public events, making it a lively and vibrant destination for visitors.",
      },
    ],
  };
}
