import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Question {
  id: number;
  question: string;
  options: { label: string; value: string }[];
}

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.css',
})
export class QuestionnaireComponent {
  currentStep = 0;
  answers: { [key: number]: string } = {};

  questions: Question[] = [
    {
      id: 1,
      question: 'Який твій улюблений тип алкоголю?',
      options: [
        { label: 'A: Темне пиво 🍺', value: 'dark-beer' },
        { label: 'B: Вино 🍷', value: 'wine' },
        { label: 'C: Віскі 🥃', value: 'whiskey' },
        { label: 'D: Міцні настоянки 🍾', value: 'strong-drinks' },
        { label: 'E: Ель 🍻', value: 'ale' },
        { label: 'F: Коктейлі 🍸', value: 'cocktails' },
      ],
    },
    {
      id: 2,
      question: "Як ти п'єш?",
      options: [
        { label: 'A: Повільно, смакуючи кожен ковток', value: 'slowly' },
        { label: 'B: Швидко — я тут, щоб веселитися', value: 'quickly' },
        { label: 'C: У компанії друзів', value: 'with-friends' },
        { label: 'D: На самоті, філософствуючи', value: 'alone' },
        { label: 'E: За барною стійкою, знайомлячись із новими людьми', value: 'at-bar' },
        { label: 'F: Тільки коли є настрій', value: 'when-mood' },
      ],
    },
    {
      id: 3,
      question: 'Що ти цінуєш у барі?',
      options: [
        { label: 'A: Атмосферу', value: 'atmosphere' },
        { label: 'B: Якість напоїв', value: 'quality' },
        { label: 'C: Музику', value: 'music' },
        { label: 'D: Людей', value: 'people' },
        { label: 'E: Історію місця', value: 'history' },
        { label: 'F: Щоб бармен тебе розумів з півслова', value: 'bartender' },
      ],
    },
    {
      id: 4,
      question: 'Що ти за компанією?',
      options: [
        { label: 'A: Той, хто розважає', value: 'entertainer' },
        { label: 'B: Той, хто слухає', value: 'listener' },
        { label: 'C: Лідер', value: 'leader' },
        { label: 'D: Мудрий порадник', value: 'advisor' },
        { label: 'E: Душа вечірки', value: 'party-soul' },
        { label: 'F: Той, хто загадково зникає після другого келиха', value: 'mysterious' },
      ],
    },
    {
      id: 5,
      question: 'Який твій рівень алкоголю у крові після вечора?',
      options: [
        { label: 'A: Тепло в душі, але тверезий', value: 'sober' },
        { label: 'B: Веселий і говіркий', value: 'cheerful' },
        { label: 'C: Трохи занадто впевнений у собі', value: 'confident' },
        { label: 'D: Філософ', value: 'philosopher' },
        { label: 'E: "Ще один — і я співаю"', value: 'singer' },
        { label: 'F: Уже на іншій планеті', value: 'different-planet' },
      ],
    },
    {
      id: 6,
      question: 'Улюблена закуска?',
      options: [
        { label: "A: М'ясна тарілка", value: 'meat' },
        { label: 'B: Сири', value: 'cheese' },
        { label: 'C: Щось екзотичне', value: 'exotic' },
        { label: 'D: Горішки або сухарики', value: 'nuts' },
        { label: 'E: Фрукти', value: 'fruits' },
        { label: 'F: Нічого, я п\'ю "чисто"', value: 'nothing' },
      ],
    },
    {
      id: 7,
      question: 'Як ти поводишся після алкоголю?',
      options: [
        { label: 'A: Починаю філософствувати', value: 'philosophize' },
        { label: 'B: Сміюся з усього', value: 'laugh' },
        { label: 'C: Хочу битися або змагатися', value: 'fight' },
        { label: 'D: Роздаю поради', value: 'advice' },
        { label: 'E: Зникаю кудись на пригоди', value: 'adventures' },
        { label: 'F: Влаштовую танці', value: 'dance' },
      ],
    },
    {
      id: 8,
      question: 'Який твій ідеальний бар?',
      options: [
        { label: 'A: Маленький і атмосферний', value: 'small-cozy' },
        { label: 'B: Класичний винний льох', value: 'wine-cellar' },
        { label: 'C: Рок-паб', value: 'rock-pub' },
        { label: 'D: Магічний лаунж', value: 'magic-lounge' },
        { label: 'E: Гірська таверна', value: 'mountain-tavern' },
        { label: 'F: Тропічний бар біля моря', value: 'tropical-bar' },
      ],
    },
    {
      id: 9,
      question: 'Як ти ставишся до магії (або всього незвичайного)?',
      options: [
        { label: 'A: Цікавлюсь, але обережно', value: 'curious' },
        { label: 'B: Вірю, бо бачив', value: 'believer' },
        { label: 'C: Використовую у своїх цілях', value: 'user' },
        { label: 'D: Скептик', value: 'skeptic' },
        { label: 'E: Це частина мого життя', value: 'part-of-life' },
        { label: 'F: Я і є магія 😎', value: 'i-am-magic' },
      ],
    },
    {
      id: 10,
      question: 'Яке твоє головне життєве кредо?',
      options: [
        { label: 'A: "Життя — це пригода"', value: 'adventure' },
        { label: 'B: "Сила — у спокої"', value: 'peace' },
        { label: 'C: "Хто не ризикує, той не живе"', value: 'risk' },
        { label: 'D: "Мудрість у поміркованості"', value: 'moderation' },
        { label: 'E: "Вино і друзі — найкращі ліки"', value: 'wine-friends' },
        { label: 'F: "Світ — це бар, а я його бармен"', value: 'bartender-life' },
      ],
    },
    {
      id: 11,
      question: 'Як я можу звертатись до Вас?',
      options: [
        { label: 'A: Героїне', value: 'heroine' },
        { label: 'B: Героє', value: 'hero' },
        { label: 'C: Хочу бути прихованим', value: 'hidden' },
      ],
    },
  ];

  constructor(private router: Router) {}

  get currentQuestion(): Question {
    return this.questions[this.currentStep];
  }

  get progress(): number {
    return ((this.currentStep + 1) / this.questions.length) * 100;
  }

  selectAnswer(value: string) {
    this.answers[this.currentQuestion.id] = value;
  }

  isSelected(value: string): boolean {
    return this.answers[this.currentQuestion.id] === value;
  }

  nextStep() {
    if (this.answers[this.currentQuestion.id]) {
      if (this.currentStep < this.questions.length - 1) {
        this.currentStep++;
      } else {
        this.submitQuestionnaire();
      }
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  submitQuestionnaire() {
    // Get gender from question 11
    const gender = this.answers[11];

    // Navigate to race-result with answers and gender
    this.router.navigate(['/race-result'], {
      state: {
        answers: this.answers,
        gender: gender,
      },
    });
  }
}
