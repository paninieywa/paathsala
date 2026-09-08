import { Flame, Trophy, Crown, Rocket, MessageCircle, Share2, BookOpen, Sparkles } from 'lucide-react';

export type BadgeStats = {
  streak: number;
  totalQuizzes: number;
  totalMocks: number;
  forumPosts: number;
  resourcesShared: number;
};

export type Badge = {
  id: string;
  title: string;
  description: string;
  icon: typeof Flame;
  color: string;
  check: (stats: BadgeStats) => boolean;
};

export const badges: Badge[] = [
  { id: 'streak-3', title: '3-Day Starter', description: 'Completed a quiz 3 days in a row', icon: Flame, color: '#E5A13B', check: (s) => s.streak >= 3 },
  { id: 'streak-7', title: '7-Day Habit', description: 'A full week of daily practice', icon: Sparkles, color: '#5B8DEF', check: (s) => s.streak >= 7 },
  { id: 'streak-30', title: '30-Day Scholar', description: 'A month of consistent study', icon: Trophy, color: '#2F7A56', check: (s) => s.streak >= 30 },
  { id: 'streak-100', title: '100-Day Legend', description: 'One hundred days of showing up', icon: Crown, color: '#A6303A', check: (s) => s.streak >= 100 },
  { id: 'quiz-rookie', title: 'Quiz Rookie', description: 'Completed 10 daily quizzes', icon: BookOpen, color: '#E5A13B', check: (s) => s.totalQuizzes >= 10 },
  { id: 'mock-master', title: 'Mock Master', description: 'Completed 5 full mock tests', icon: Rocket, color: '#5B8DEF', check: (s) => s.totalMocks >= 5 },
  { id: 'community-voice', title: 'Community Voice', description: 'Posted 5 times in exam forums', icon: MessageCircle, color: '#2F7A56', check: (s) => s.forumPosts >= 5 },
  { id: 'resource-sharer', title: 'Resource Sharer', description: 'Shared 2 study resources with others', icon: Share2, color: '#A6303A', check: (s) => s.resourcesShared >= 2 },
];

export function getEarnedBadges(stats: BadgeStats) {
  return badges.filter((b) => b.check(stats));
}
