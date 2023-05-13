import { category } from "../models/category.model"

export const CATEGORIES: category[] = [
    {
        title: 'Játék',
        icon: 'games',
        value: 'game',
        color: 'teal',
        url: '/home/game'
    },
    {
        title: 'Eredmények',
        icon: 'star',
        value: 'results',
        color: '#c2185b',
        url: '/home/scores'
    }

];
