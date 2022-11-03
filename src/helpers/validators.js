/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import {
    compose,
    all,
    allPass,
    anyPass,
    not,
    equals,
    prop,
    length,
    filter,
    values,
    lte
} from "ramda";

const isWhite = equals("white");
const isRed = equals("red");
const isGreen = equals("green");
const isOrange = equals("orange");
const isBlue = equals("blue");

const getCircle = prop("circle");
const getSquare = prop("square");
const getTriangle = prop("triangle");
const getStar = prop("star");

const getWhiteCount = compose(length, filter(isWhite), values);
const getOrangeCount = compose(length, filter(isOrange), values);
const getGreenCount = compose(length, filter(isGreen), values);
const getRedCount = compose(length, filter(isRed), values);
const getBlueCount = compose(length, filter(isBlue), values);

// main
const isRedStar = compose(isRed, getStar);
const isGreenSquare = compose(isGreen, getSquare);
const isBlueCircle = compose(isBlue, getCircle);
const isOrangeSquare = compose(isOrange, getSquare);
const isGreenTriangle = compose(isGreen, getTriangle);

const notRedStar = compose(not, isRed, getStar);
const notWhiteStar = compose(not, isWhite, getStar);
const notWhiteSquare = compose(not, isWhite, getSquare);

const allOrange = all(isOrange);
const allGreen = all(isGreen);

const oneRed = compose(equals(1), getRedCount);
const twoGreens = compose(equals(2), getGreenCount);
const twoWhites = compose(equals(2), getWhiteCount);

const minThreeGreen = compose(lte(3), getGreenCount);
const minThreeBlue = compose(lte(3), getBlueCount);
const minThreeOrange = compose(lte(3), getOrangeCount);
const minThreeRed = compose(lte(3), getRedCount);

const TriangleEqualSquare = shapes => equals(getTriangle(shapes), getSquare(shapes));

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([isRedStar, isGreenSquare, twoWhites]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(lte(2), getGreenCount);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = shapes => equals(getBlueCount(shapes), getRedCount(shapes));

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([isBlueCircle, isRedStar, isOrangeSquare]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = anyPass([
    minThreeGreen,
    minThreeBlue,
    minThreeOrange,
    minThreeRed,
]);

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([isGreenTriangle, twoGreens, oneRed]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(allOrange, values);

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([notRedStar, notWhiteStar]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(allGreen, values);

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([notWhiteSquare, TriangleEqualSquare]);
