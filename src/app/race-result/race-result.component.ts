import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface RaceResult {
  name: string;
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-race-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './race-result.component.html',
  styleUrl: './race-result.component.css',
})
export class RaceResultComponent implements OnInit {
  isLoading = true;
  progress = 0;
  userRace: RaceResult | null = null;

  // Race mapping for answers
  private raceMapping: { [key: string]: string[] } = {
    // Question 1
    'dark-beer': ['Dwarf', 'Half-Orc'],
    wine: ['Elf', 'Aasimar', 'Half-Elf'],
    whiskey: ['Human', 'Dragonborn'],
    'strong-drinks': ['Gnome', 'Half-Orc'],
    ale: ['Halfling', 'Dwarf'],
    cocktails: ['Tiefling', 'Human'],

    // Question 2
    slowly: ['Elf', 'Aasimar'],
    quickly: ['Halfling', 'Tiefling'],
    'with-friends': ['Human', 'Half-Elf'],
    alone: ['Dragonborn', 'Aasimar'],
    'at-bar': ['Tiefling', 'Half-Orc'],
    'when-mood': ['Gnome', 'Elf'],

    // Question 3
    atmosphere: ['Aasimar', 'Elf'],
    quality: ['Elf', 'Human'],
    music: ['Dragonborn', 'Tiefling'],
    people: ['Halfling', 'Half-Elf'],
    history: ['Dwarf', 'Half-Orc'],
    bartender: ['Gnome', 'Tiefling'],

    // Question 4
    entertainer: ['Halfling', 'Tiefling'],
    listener: ['Aasimar', 'Elf'],
    leader: ['Dragonborn', 'Human'],
    advisor: ['Gnome', 'Elf'],
    'party-soul': ['Halfling', 'Dwarf'],
    mysterious: ['Half-Orc', 'Tiefling'],

    // Question 5
    sober: ['Aasimar'],
    cheerful: ['Halfling', 'Human'],
    confident: ['Dragonborn', 'Half-Orc'],
    philosopher: ['Elf'],
    singer: ['Gnome', 'Dwarf'],
    'different-planet': ['Tiefling'],

    // Question 6
    meat: ['Dwarf', 'Dragonborn'],
    cheese: ['Elf', 'Aasimar'],
    exotic: ['Tiefling', 'Gnome'],
    nuts: ['Halfling', 'Half-Orc'],
    fruits: ['Half-Elf', 'Elf'],
    nothing: ['Human', 'Tiefling'],

    // Question 7
    philosophize: ['Elf', 'Aasimar'],
    laugh: ['Halfling', 'Human'],
    fight: ['Dragonborn', 'Half-Orc'],
    advice: ['Gnome'],
    adventures: ['Tiefling'],
    dance: ['Dwarf', 'Halfling'],

    // Question 8
    'small-cozy': ['Aasimar'],
    'wine-cellar': ['Elf'],
    'rock-pub': ['Dragonborn'],
    'magic-lounge': ['Tiefling'],
    'mountain-tavern': ['Dwarf', 'Gnome'],
    'tropical-bar': ['Halfling', 'Human'],

    // Question 9
    curious: ['Human', 'Dwarf'],
    believer: ['Aasimar'],
    user: ['Dragonborn'],
    skeptic: ['Gnome', 'Half-Orc'],
    'part-of-life': ['Elf', 'Half-Elf'],
    'i-am-magic': ['Tiefling'],

    // Question 10
    adventure: ['Halfling'],
    peace: ['Aasimar'],
    risk: ['Dragonborn'],
    moderation: ['Elf'],
    'wine-friends': ['Human', 'Half-Elf'],
    'bartender-life': ['Tiefling', 'Gnome'],
  };

  private raceDescriptions: { [key: string]: { title: string; description: string } } = {
    Aasimar: {
      title: 'The Noble Taster',
      description:
        'Aasimars drink with celestial grace. Wine is their sacred nectar. After a few sips they start offering wisdom nobody asked for — yet somehow everyone listens. They sit quietly in bars, but bartenders know: a single nod from an Aasimar means the drink is perfect.',
    },
    Dragonborn: {
      title: 'The Fireproof Drinker',
      description:
        "Dragonborn treat whiskey like water. A couple of shots and they're ready to challenge the bar counter to a duel. They thrive in rock pubs or any place where competition (or arm-wrestling) is encouraged.",
    },
    Dwarf: {
      title: 'The Lord of Dark Beer',
      description:
        'Dwarves are the kings of dark beer, ale, and meat platters. A bar is their temple. They tell long stories nobody asked for — but everyone remembers. Drunk dancing? Yes, but only while sitting.',
    },
    Elf: {
      title: 'The Elegant Enologist',
      description:
        'Elves are all about wine, cheese plates, and philosophical conversations. Give them a sip and they turn into poets, sages, and life theorists. Even bartenders take notes when an elf speaks after drinking.',
    },
    Gnome: {
      title: 'The Master of Potent Spirits',
      description:
        'Gnomes love the strongest spirits available. Their courage is directly tied to alcohol percentage. After a few shots they start giving advice… often about machines that do not exist.',
    },
    'Half-Elf': {
      title: 'The Balanced Drinker',
      description:
        'Half-elves enjoy wine, exotic dishes, and good company. They fit anywhere: quietly at a corner table or leading a fun conversation. Wherever they go, they add charm and comfort.',
    },
    'Half-Orc': {
      title: 'The Shot Warrior',
      description:
        'Half-orcs love strong drinks, dark beer, and challenges. They drink fast and loudly, as if preparing for battle. After drinking they become overly confident — but in a funny, not dangerous way.',
    },
    Halfling: {
      title: 'The Heart of the Party',
      description:
        'Halflings are laughter, dancing, cocktails, ale, and wild stories that start with: "Okay, listen, this one\'s hilarious…" They may vanish after the second drink and return with five new friends.',
    },
    Human: {
      title: 'The Versatile Drinker',
      description:
        'Humans drink everything: whiskey, cocktails, ale, wine. They adapt to any vibe — party soul, listener, or philosopher. Always balanced between logic and chaos.',
    },
    Tiefling: {
      title: 'The Cocktail Sorcerer',
      description:
        'Tieflings are masters of cocktails, magical drinks, and smoky lounges. After alcohol they become dangerously charismatic, glowing-eyed agents of chaos. Their perfect bar is a mystical lounge full of arcane vibes and strange music.',
    },
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.calculateRace();
    this.startLoadingAnimation();
  }

  calculateRace() {
    const answers = history.state.answers;
    const gender = history.state.gender; // 'heroine', 'hero', or 'hidden'

    if (!answers) {
      this.router.navigate(['/questionnaire']);
      return;
    }

    // Count races
    const raceCounts: { [key: string]: number } = {};

    Object.values(answers).forEach((answer: any) => {
      const races = this.raceMapping[answer] || [];
      races.forEach((race) => {
        raceCounts[race] = (raceCounts[race] || 0) + 1;
      });
    });

    // Find race with highest score
    let maxCount = 0;
    let selectedRace = 'Human';

    Object.entries(raceCounts).forEach(([race, count]) => {
      if (count > maxCount) {
        maxCount = count;
        selectedRace = race;
      }
    });

    // Determine image based on gender
    let imageSuffix = 'm'; // default male
    if (gender === 'heroine') {
      imageSuffix = 'f';
    } else if (gender === 'hero') {
      imageSuffix = 'm';
    } else {
      // hidden - random
      imageSuffix = Math.random() > 0.5 ? 'm' : 'f';
    }

    const raceInfo = this.raceDescriptions[selectedRace];
    this.userRace = {
      name: selectedRace,
      title: raceInfo.title,
      description: raceInfo.description,
      image: `/races_images/${selectedRace.toLowerCase()}_${imageSuffix}.jpg`,
    };
  }

  startLoadingAnimation() {
    const interval = setInterval(() => {
      this.progress += 2;
      if (this.progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          this.isLoading = false;
        }, 300);
      }
    }, 60); // 3 seconds total (60ms * 50 steps)
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
