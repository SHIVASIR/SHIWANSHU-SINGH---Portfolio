/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, Flame, ChevronRight, Github, ExternalLink, Calendar, Code2, 
  Layers, Award, AlertCircle, RefreshCw, Star, GitFork, BookOpen, 
  Clock, Activity, Play, Pause, RotateCcw, Sparkles, TrendingUp, CheckCircle2 
} from 'lucide-react';
import { codingProfileData, personalInfo } from '../data';

// --- TS Interfaces ---
interface LeetCodeData {
  username: string;
  realName: string;
  avatar: string;
  ranking: number;
  reputation: number;
  solved: {
    total: number;
    totalQuestions: number;
    easy: number;
    totalEasy: number;
    medium: number;
    totalMedium: number;
    hard: number;
    totalHard: number;
    acceptanceRate: string;
  };
  contest: {
    attendedCount: number;
    rating: number;
    globalRanking: number;
    totalParticipants: number;
    topPercentage: number;
    badge: string;
  } | null;
  recentSubmissions: Array<{
    title: string;
    titleSlug: string;
    timestamp: string;
    statusDisplay: string;
    lang: string;
  }>;
  calendar: {
    streak: number;
    totalActiveDays: number;
    activeYears: number[];
    submissionCalendar: Record<string, number>;
  };
  badges: Array<{
    id: string;
    displayName: string;
    icon: string;
    hoverText: string;
  }>;
}

interface GitHubData {
  username: string;
  name: string;
  bio: string;
  avatarUrl: string;
  followers: number;
  following: number;
  publicRepos: number;
  totalStars: number;
  totalForks: number;
  createdAt: string;
  topLanguages: Array<{ name: string; percentage: number; color: string }>;
  repos: Array<{
    name: string;
    description: string;
    stars: number;
    forks: number;
    language: string;
    url: string;
    size: number;
    updatedAt: string;
    pinned: boolean;
  }>;
  pinnedRepos: Array<{
    name: string;
    description: string;
    stars: number;
    forks: number;
    language: string;
    url: string;
  }>;
  contributionsThisYear: number;
  longestStreak: number;
  currentStreak: number;
  calendar: Array<{ date: string; level: number; count: number }>;
  events: Array<{
    id: string;
    type: string;
    repo: string;
    message: string;
    date: string;
  }>;
  activityAnalytics: {
    commitHours: number[];
    totalCommitsInEvents: number;
  };
  fallback?: boolean;
}

export default function CodingProfiles() {
  const { leetcode: staticLeetcode } = codingProfileData;

  // Tabs layout switcher
  const [activeTab, setActiveTab] = useState<'github' | 'leetcode'>('github');

  // --- LeetCode States ---
  const [lcData, setLcData] = useState<LeetCodeData | null>(null);
  const [lcLoading, setLcLoading] = useState(true);
  const [lcError, setLcError] = useState<string | null>(null);
  const [lcRefreshing, setLcRefreshing] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  // --- GitHub States ---
  const [ghData, setGhData] = useState<GitHubData | null>(null);
  const [ghLoading, setGhLoading] = useState(true);
  const [ghError, setGhError] = useState<string | null>(null);
  const [ghRefreshing, setGhRefreshing] = useState(false);

  // --- Snake Game States ---
  const [isSnakeActive, setIsSnakeActive] = useState(false);
  const [snake, setSnake] = useState<{ x: number; y: number }[]>([
    { x: 3, y: 1 },
    { x: 2, y: 1 },
    { x: 1, y: 1 },
  ]);
  const [snakeDirection, setSnakeDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [eatenCells, setEatenCells] = useState<Set<string>>(new Set());
  const [snakeScore, setSnakeScore] = useState(0);

  // --- LeetCode Handlers ---
  const fetchLeetcodeDetails = async (isManual = false) => {
    if (isManual) setLcRefreshing(true);
    else setLcLoading(true);

    try {
      const res = await fetch('/api/leetcode?username=shiwanshu0711');
      if (!res.ok) {
        throw new Error('Failed to retrieve fresh LeetCode statistics.');
      }
      const jsonData = await res.json();
      setLcData(jsonData);
      setLcError(null);
    } catch (err: any) {
      console.error(err);
      setLcError(err.message || 'Unable to connect to the LeetCode API route.');
    } finally {
      setLcLoading(false);
      setLcRefreshing(false);
    }
  };

  // --- GitHub Handlers ---
  const fetchGithubDetails = async (isManual = false) => {
    if (isManual) setGhRefreshing(true);
    else setGhLoading(true);

    try {
      const res = await fetch('/api/github?username=SHIVASIR');
      if (!res.ok) {
        throw new Error('Failed to retrieve fresh GitHub profile stats.');
      }
      const jsonData = await res.json();
      setGhData(jsonData);
      setGhError(null);
    } catch (err: any) {
      console.error(err);
      setGhError(err.message || 'Unable to connect to the GitHub API route.');
    } finally {
      setGhLoading(false);
      setGhRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeetcodeDetails();
    fetchGithubDetails();

    // Revalidate periodically every 5 minutes
    const interval = setInterval(() => {
      fetchLeetcodeDetails(true);
      fetchGithubDetails(true);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Update selected year to the latest active year from LeetCode
  useEffect(() => {
    if (lcData?.calendar?.activeYears && lcData.calendar.activeYears.length > 0) {
      setSelectedYear(lcData.calendar.activeYears[0]);
    }
  }, [lcData]);

  // --- Contribution Snake Brain ---
  useEffect(() => {
    if (!isSnakeActive || !ghData?.calendar || ghData.calendar.length === 0) return;

    const colsCount = Math.ceil(ghData.calendar.length / 7);
    const rowsCount = 7;

    // Build 2D level matrix
    const grid: number[][] = Array(colsCount).fill(null).map(() => Array(rowsCount).fill(0));
    ghData.calendar.forEach((day, idx) => {
      const c = Math.floor(idx / 7);
      const r = idx % 7;
      if (c < colsCount && r < rowsCount) {
        grid[c][r] = day.level;
      }
    });

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        let nextDir = snakeDirection;

        // Path finding - look for nearby active cells (level > 0) that are not eaten yet
        let target: { x: number; y: number } | null = null;
        let minDist = Infinity;

        for (let x = 0; x < colsCount; x++) {
          for (let y = 0; y < rowsCount; y++) {
            if (grid[x][y] > 0 && !eatenCells.has(`${x}-${y}`)) {
              const dist = Math.abs(head.x - x) + Math.abs(head.y - y);
              if (dist < minDist) {
                minDist = dist;
                target = { x, y };
              }
            }
          }
        }

        // Steer snake towards target
        if (target) {
          const dx = target.x - head.x;
          const dy = target.y - head.y;

          if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0 && snakeDirection !== 'LEFT') nextDir = 'RIGHT';
            else if (dx < 0 && snakeDirection !== 'RIGHT') nextDir = 'LEFT';
            else if (dy > 0 && snakeDirection !== 'UP') nextDir = 'DOWN';
            else if (dy < 0 && snakeDirection !== 'DOWN') nextDir = 'UP';
          } else {
            if (dy > 0 && snakeDirection !== 'UP') nextDir = 'DOWN';
            else if (dy < 0 && snakeDirection !== 'DOWN') nextDir = 'UP';
            else if (dx > 0 && snakeDirection !== 'LEFT') nextDir = 'RIGHT';
            else if (dx < 0 && snakeDirection !== 'RIGHT') nextDir = 'LEFT';
          }
        } else {
          // No active targets, move wavy/semi-randomly
          if (Math.random() < 0.2) {
            const dirs: ('UP' | 'DOWN' | 'LEFT' | 'RIGHT')[] = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
            const validDirs = dirs.filter(d => {
              if (d === 'UP' && snakeDirection === 'DOWN') return false;
              if (d === 'DOWN' && snakeDirection === 'UP') return false;
              if (d === 'LEFT' && snakeDirection === 'RIGHT') return false;
              if (d === 'RIGHT' && snakeDirection === 'LEFT') return false;
              return true;
            });
            nextDir = validDirs[Math.floor(Math.random() * validDirs.length)];
          }
        }

        setSnakeDirection(nextDir);

        // Advance snake head (incorporating grid wraps)
        let newHead = { ...head };
        if (nextDir === 'RIGHT') newHead.x = (head.x + 1) % colsCount;
        else if (nextDir === 'LEFT') newHead.x = (head.x - 1 + colsCount) % colsCount;
        else if (nextDir === 'DOWN') newHead.y = (head.y + 1) % rowsCount;
        else if (nextDir === 'UP') newHead.y = (head.y - 1 + rowsCount) % rowsCount;

        const cellKey = `${newHead.x}-${newHead.y}`;
        const headLevel = grid[newHead.x]?.[newHead.y] || 0;

        let grew = false;
        if (headLevel > 0 && !eatenCells.has(cellKey)) {
          grew = true;
          setEatenCells((prev) => {
            const copy = new Set(prev);
            copy.add(cellKey);
            return copy;
          });
          setSnakeScore((prevScore) => prevScore + headLevel * 10);
        }

        const newSnake = [newHead, ...prevSnake];
        if (!grew) {
          newSnake.pop(); // Standard move: pop tail
        }
        return newSnake;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isSnakeActive, snakeDirection, eatenCells, ghData]);

  const resetSnakeGame = () => {
    setSnake([
      { x: 3, y: 1 },
      { x: 2, y: 1 },
      { x: 1, y: 1 },
    ]);
    setSnakeDirection('RIGHT');
    setEatenCells(new Set());
    setSnakeScore(0);
    setIsSnakeActive(true);
  };

  // --- Heatmap Helper Matrix (LeetCode) ---
  const generateCalendarData = (year: number) => {
    const jan1 = new Date(year, 0, 1);
    const dec31 = new Date(year, 11, 31);
    const startOffset = jan1.getDay();
    const endOffset = 6 - dec31.getDay();
    const startDate = new Date(year, 0, 1 - startOffset);
    const endDate = new Date(year, 11, 31 + endOffset);
    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];
    const current = new Date(startDate);
    while (current <= endDate) {
      currentWeek.push(new Date(current));
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      current.setDate(current.getDate() + 1);
    }
    return weeks;
  };

  const getStreakStats = (calendarObj: Record<string, number> | undefined) => {
    if (!calendarObj) return { current: 0, max: 0, totalActive: 0 };
    const activeDates = Object.entries(calendarObj)
      .filter(([_, count]) => Number(count) > 0)
      .map(([timestamp]) => {
        const d = new Date(parseInt(timestamp) * 1000);
        const yr = d.getFullYear();
        const mo = String(d.getMonth() + 1).padStart(2, '0');
        const dy = String(d.getDate()).padStart(2, '0');
        return `${yr}-${mo}-${dy}`;
      });
    const uniqueDates = Array.from(new Set(activeDates)).sort();
    
    let maxStreak = 0;
    let tempStreak = 0;
    let lastDate: Date | null = null;
    
    uniqueDates.forEach((dateStr) => {
      const currentD = new Date(dateStr);
      if (lastDate === null) {
        tempStreak = 1;
      } else {
        const diffTime = Math.abs(currentD.getTime() - lastDate.getTime());
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          tempStreak++;
        } else if (diffDays > 1) {
          if (tempStreak > maxStreak) {
            maxStreak = tempStreak;
          }
          tempStreak = 1;
        }
      }
      lastDate = currentD;
    });
    if (tempStreak > maxStreak) {
      maxStreak = tempStreak;
    }

    let currentStreak = 0;
    const todayStr = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    const hasToday = uniqueDates.includes(todayStr);
    const hasYesterday = uniqueDates.includes(yesterdayStr);

    if (hasToday || hasYesterday) {
      let idx = uniqueDates.length - 1;
      let lastParsed = new Date(uniqueDates[idx]);
      currentStreak = 1;
      const lastParsedStr = uniqueDates[idx];
      if (lastParsedStr === todayStr || lastParsedStr === yesterdayStr) {
        idx--;
        while (idx >= 0) {
          const currParsed = new Date(uniqueDates[idx]);
          const diffTime = Math.abs(lastParsed.getTime() - currParsed.getTime());
          const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays === 1) {
            currentStreak++;
            lastParsed = currParsed;
            idx--;
          } else {
            break;
          }
        }
      } else {
        currentStreak = 0;
      }
    }
    return { max: maxStreak, current: currentStreak, totalActive: uniqueDates.length };
  };

  const getIntensity = (count: number) => {
    if (count <= 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 9) return 3;
    return 4;
  };

  const getLeetcodeHeatmapColor = (intensity: number) => {
    switch (intensity) {
      case 0: return 'bg-zinc-100 dark:bg-zinc-900/40 border border-transparent dark:border-zinc-805';
      case 1: return 'bg-emerald-100 dark:bg-[#1b3e1f] text-[#1b3021] dark:text-[#a3e635]/80';
      case 2: return 'bg-[#c3e6cb] dark:bg-[#2d5d30]';
      case 3: return 'bg-[#94d3a2] dark:bg-[#488e4c]';
      default: return 'bg-[#28a745] dark:bg-[#6ed172]';
    }
  };

  const getGithubHeatmapColor = (level: number, col: number, row: number) => {
    // If snake animation is active, map coordinates
    if (isSnakeActive) {
      const isHead = snake[0].x === col && snake[0].y === row;
      if (isHead) return 'bg-amber-400 border border-amber-500 shadow-[0_0_8px_#fbbf24] animate-pulse rounded-[1.5px] scale-110';
      
      const bodyIndex = snake.findIndex((seg, idx) => idx > 0 && seg.x === col && seg.y === row);
      if (bodyIndex !== -1) return 'bg-cyan-400 border border-cyan-500 shadow-[0_0_6px_#22d3ee] rounded-[1.5px]';

      if (eatenCells.has(`${col}-${row}`)) return 'bg-[#86198f]/20 border border-[#c084fc]/30 rounded-[1.5px] scale-90';
    }

    switch (level) {
      case 0: return 'bg-zinc-100 dark:bg-zinc-900 border border-transparent dark:border-zinc-900';
      case 1: return 'bg-[#9be9a8] dark:bg-[#0e4429]';
      case 2: return 'bg-[#40c463] dark:bg-[#006d32]';
      case 3: return 'bg-[#30a14e] dark:bg-[#26a641]';
      default: return 'bg-[#216e39] dark:bg-[#39d353]';
    }
  };

  const getGithubLanguageColor = (lang: string) => {
    const colors: Record<string, string> = {
      "Python": "#3572A5",
      "C++": "#f34b7d",
      "C": "#555555",
      "Java": "#b07219",
      "JavaScript": "#f1e05a",
      "TypeScript": "#3178c6",
      "HTML": "#e34c26",
      "CSS": "#563d7c",
      "Shell": "#89e051",
      "Rust": "#dea584",
      "Go": "#00ADD8",
      "Jupyter Notebook": "#DA5B0B"
    };
    return colors[lang] || "#858585";
  };

  const getRelativeTime = (timestampStr: string) => {
    const timestamp = parseInt(timestampStr);
    const now = Math.floor(Date.now() / 1000);
    const diff = now - timestamp;
    if (diff < 60) return 'Just now';
    const mins = Math.floor(diff / 60);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const formatGithubTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getGithubEventIcon = (type: string) => {
    switch (type) {
      case 'PushEvent':
        return <Activity className="h-3.5 w-3.5 text-emerald-500" />;
      case 'CreateEvent':
        return <PlusIcon className="h-3.5 w-3.5 text-blue-500" />;
      default:
        return <Activity className="h-3.5 w-3.5 text-purple-500" />;
    }
  };

  // Helper mock element for Plus Icon
  const PlusIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );

  // --- LeetCode Computed Helpers ---
  const submissionCalendar = lcData?.calendar?.submissionCalendar || {};
  const countMap = new Map<string, number>();
  Object.entries(submissionCalendar).forEach(([timestamp, count]) => {
    const d = new Date(parseInt(timestamp) * 1000);
    const yr = d.getFullYear();
    const mo = String(d.getMonth() + 1).padStart(2, '0');
    const dy = String(d.getDate()).padStart(2, '0');
    countMap.set(`${yr}-${mo}-${dy}`, Number(count));
  });

  const activeYears = lcData?.calendar?.activeYears && lcData.calendar.activeYears.length > 0 
    ? lcData.calendar.activeYears 
    : [2026];

  const weeks = generateCalendarData(selectedYear);

  const streakStats = getStreakStats(lcData?.calendar?.submissionCalendar);
  const currentStreakVal = lcData?.calendar?.streak 
    ? Math.max(lcData.calendar.streak, streakStats.current) 
    : staticLeetcode.streak;
  const maxStreakVal = Math.max(streakStats.max, currentStreakVal);

  const activeDaysForYear = Object.entries(submissionCalendar)
    .filter(([_, count]) => Number(count) > 0)
    .map(([ts]) => new Date(parseInt(ts) * 1000))
    .filter((d) => d.getFullYear() === selectedYear).length;

  // --- GitHub Computed Trophies ---
  const getTrophyTier = (stat: string, value: number) => {
    if (stat === 'contributions') {
      if (value >= 500) return { rank: 'S+', title: 'Commits Overlord', desc: 'Prolific open-source pioneer', color: 'border-amber-500 bg-amber-500/10 text-amber-500 shadow-amber-500/10' };
      if (value >= 250) return { rank: 'A', title: 'Commit Champion', desc: 'Frequent codebase contributor', color: 'border-purple-500 bg-purple-500/10 text-purple-500 shadow-purple-500/10' };
      if (value >= 100) return { rank: 'B', title: 'Code Craftsman', desc: 'Active development loops', color: 'border-blue-500 bg-blue-500/10 text-blue-500 shadow-blue-500/10' };
      return { rank: 'C', title: 'Active Coder', desc: 'Steady coding foundations', color: 'border-slate-300 dark:border-zinc-800 bg-slate-500/5 text-slate-400' };
    }
    if (stat === 'stars') {
      if (value >= 40) return { rank: 'S+', title: 'Galaxy Master', desc: 'Stellar community recognition', color: 'border-amber-500 bg-amber-500/10 text-amber-500 shadow-amber-500/10' };
      if (value >= 15) return { rank: 'A', title: 'Star Catcher', desc: 'High demand public utilities', color: 'border-purple-500 bg-purple-500/10 text-purple-500 shadow-purple-500/10' };
      if (value >= 5) return { rank: 'B', title: 'Repo Magnet', desc: 'Valued project releases', color: 'border-blue-500 bg-blue-500/10 text-blue-500 shadow-blue-500/10' };
      return { rank: 'C', title: 'Seed Sower', desc: 'Growing algorithmic value', color: 'border-slate-300 dark:border-zinc-800 bg-slate-500/5 text-slate-400' };
    }
    if (stat === 'streak') {
      if (value >= 50) return { rank: 'S+', title: 'Streak Overlord', desc: 'Immense discipline', color: 'border-amber-500 bg-amber-500/10 text-amber-500 shadow-amber-500/10' };
      if (value >= 21) return { rank: 'A', title: 'Discipline Master', desc: 'Exceptional work consistency', color: 'border-purple-500 bg-purple-500/10 text-purple-500 shadow-purple-500/10' };
      if (value >= 7) return { rank: 'B', title: 'Workhorse', desc: 'Continuous agile sprints', color: 'border-blue-500 bg-blue-500/10 text-blue-500 shadow-blue-500/10' };
      return { rank: 'C', title: 'Wanderer', desc: 'Adaptive schedule hacker', color: 'border-slate-300 dark:border-zinc-800 bg-slate-500/5 text-slate-400' };
    }
    if (stat === 'languages') {
      if (value >= 5) return { rank: 'S+', title: 'Polyglot Sorcerer', desc: 'Unlocks ultimate code versatility', color: 'border-amber-500 bg-amber-500/10 text-amber-500 shadow-amber-500/10' };
      if (value >= 3) return { rank: 'A', title: 'Multi-Stacker', desc: 'Blends multiple paradigms', color: 'border-purple-500 bg-purple-500/10 text-purple-500 shadow-purple-500/10' };
      return { rank: 'B', title: 'Bilingual Core', desc: 'Solid technical language mix', color: 'border-blue-500 bg-blue-500/10 text-blue-500 shadow-blue-500/10' };
    }
    return { rank: 'B', title: 'Expert Developer', desc: 'High capability developer', color: 'border-blue-500 bg-blue-500/10 text-blue-500 shadow-blue-500/10' };
  };

  // Compute stats safe defaults
  const ghTotalContributions = ghData?.contributionsThisYear ?? 320;
  const ghStarsCount = ghData?.totalStars ?? 10;
  const ghStreakVal = ghData?.longestStreak ?? 21;
  const ghLangsCount = ghData?.topLanguages?.length ?? 4;

  const contributionsTrophy = getTrophyTier('contributions', ghTotalContributions);
  const starsTrophy = getTrophyTier('stars', ghStarsCount);
  const streakTrophy = getTrophyTier('streak', ghStreakVal);
  const langsTrophy = getTrophyTier('languages', ghLangsCount);

  // Parse Account Age (Years) for Recruiter insights
  const ghCreatedDate = ghData?.createdAt ? new Date(ghData.createdAt) : new Date("2024-03-12T00:00:00Z");
  const yearsActive = Math.max(1, new Date().getFullYear() - ghCreatedDate.getFullYear());

  // Calculates a custom Repository Impact Score: (stars * 10) + (forks * 15) + (repos * 5)
  const repositoryImpactScore = ((ghData?.totalStars ?? 10) * 10) + ((ghData?.totalForks ?? 3) * 15) + ((ghData?.publicRepos ?? 18) * 5);

  return (
    <section id="coding-profiles" className="py-24 bg-[#030303] text-zinc-100 relative z-20 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center md:text-left mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/30 border border-blue-900/50 px-3.5 py-1.5 rounded-full mb-4"
            >
              05 . REAL-TIME PORTAL INTEGRATIONS
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight"
            >
              Professional Engineering Hub
            </motion.h2>
          </div>

          {/* Sync status & Tab Switcher */}
          <div className="flex flex-col sm:flex-row items-center gap-3 self-center md:self-end">
            <div className="flex bg-slate-100 dark:bg-zinc-900 p-1.5 rounded-lg border border-slate-200/60 dark:border-zinc-800/60">
              <button
                onClick={() => setActiveTab('github')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'github'
                    ? 'bg-[#24292f] text-white dark:bg-zinc-850 dark:text-zinc-100 shadow-sm'
                    : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'
                }`}
              >
                <Github className="h-3.5 w-3.5" />
                <span>GitHub Dashboard</span>
              </button>
              <button
                onClick={() => setActiveTab('leetcode')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'leetcode'
                    ? 'bg-[#24292f] text-white dark:bg-zinc-850 dark:text-zinc-100 shadow-sm'
                    : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'
                }`}
              >
                <Trophy className="h-3.5 w-3.5" />
                <span>LeetCode Desk</span>
              </button>
            </div>

            {activeTab === 'github' ? (
              <button
                onClick={() => fetchGithubDetails(true)}
                disabled={ghRefreshing || ghLoading}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 text-xs font-semibold text-slate-600 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-900/65 flex items-center space-x-1.5 transition-all shadow-sm disabled:opacity-50"
              >
                <RefreshCw className={`h-3 w-3 ${(ghRefreshing || ghLoading) ? 'animate-spin' : ''}`} />
                <span>{(ghRefreshing || ghLoading) ? 'Refreshing...' : 'Sync GitHub'}</span>
              </button>
            ) : (
              <button
                onClick={() => fetchLeetcodeDetails(true)}
                disabled={lcRefreshing || lcLoading}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 text-xs font-semibold text-slate-600 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-900/65 flex items-center space-x-1.5 transition-all shadow-sm disabled:opacity-50"
              >
                <RefreshCw className={`h-3 w-3 ${(lcRefreshing || lcLoading) ? 'animate-spin' : ''}`} />
                <span>{(lcRefreshing || lcLoading) ? 'Refreshing...' : 'Sync LeetCode'}</span>
              </button>
            )}
          </div>
        </div>

        {/* --- MAIN TABS WORKSPACE --- */}
        <div>
          {/* ==================== GITHUB HUB TAB ==================== */}
          {activeTab === 'github' && (
            <div className="space-y-8 animate-fade-in">
              {ghLoading && !ghData ? (
                // Full elegant skeleton loading state for GitHub
                <div className="space-y-6 animate-pulse">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-4 h-64 bg-slate-50 dark:bg-zinc-900/30 rounded-2xl border dark:border-zinc-800" />
                    <div className="lg:col-span-8 h-64 bg-slate-50 dark:bg-zinc-900/30 rounded-2xl border dark:border-zinc-800" />
                  </div>
                  <div className="h-44 bg-slate-50 dark:bg-zinc-900/30 rounded-2xl border dark:border-zinc-800" />
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* LEFT BRIEFCASE: profile info card & trophies */}
                  <div className="lg:col-span-4 space-y-6">
                    
                    {/* Official Look & Feel Profile Info */}
                    <div className="p-6 rounded-2xl border border-gray-200/80 dark:border-zinc-800 bg-slate-50/40 dark:bg-zinc-900/10 backdrop-blur-md shadow-sm">
                      <div className="flex flex-col items-center text-center">
                        <div className="relative group">
                          <img
                            src={ghData?.avatarUrl || "https://github.com/SHIVASIR.png"}
                            alt="GitHub Avatar"
                            className="h-28 w-28 rounded-full border border-gray-200 dark:border-zinc-800 object-cover ring-2 ring-slate-100 dark:ring-zinc-800 shadow-md group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute -bottom-1 right-2 p-1 bg-[#24292f] dark:bg-zinc-850 text-white rounded-md border border-zinc-700/40">
                            <Github className="h-3.5 w-3.5" />
                          </div>
                        </div>

                        <div className="mt-4">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            {ghData?.name || "Shiwansh Kumar Singh"}
                          </h3>
                          <p className="text-xs font-mono font-medium text-slate-400 mt-1">
                            @{ghData?.username || "SHIVASIR"}
                          </p>
                        </div>

                        <p className="text-sm text-slate-600 dark:text-zinc-400 mt-3 leading-relaxed max-w-xs">
                          {ghData?.bio || "No biography provided."}
                        </p>

                        <div className="flex items-center space-x-4 text-xs font-semibold text-slate-500 dark:text-zinc-400 mt-4 pb-4 border-b border-gray-100 dark:border-zinc-900 w-full justify-center">
                          <div className="flex items-center space-x-1">
                            <span className="text-slate-800 dark:text-slate-200 font-mono font-bold">{ghData?.followers || 0}</span>
                            <span>followers</span>
                          </div>
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-350" />
                          <div className="flex items-center space-x-1">
                            <span className="text-slate-800 dark:text-slate-200 font-mono font-bold">{ghData?.following || 0}</span>
                            <span>following</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-left w-full pt-4 text-xs">
                          <div>
                            <span className="text-slate-450 dark:text-slate-500 block uppercase font-bold tracking-wide text-[10px] font-mono">PUBLIC REPOS</span>
                            <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono">{ghData?.publicRepos || 0}</span>
                          </div>
                          <div>
                            <span className="text-slate-450 dark:text-slate-500 block uppercase font-bold tracking-wide text-[10px] font-mono">STAR POWER</span>
                            <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono flex items-center gap-1">
                              <Star className="h-4.5 w-4.5 text-amber-500 fill-amber-500/10 shrink-0" />
                              <span>{ghData?.totalStars || 0}</span>
                            </span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-slate-450 dark:text-slate-500 block uppercase font-bold tracking-wide text-[10px] font-mono">ACCRUED ACTIVE LOGS</span>
                            <span className="text-[11px] font-semibold text-slate-600 dark:text-zinc-400 mt-0.5 block flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5 text-zinc-450" />
                              <span>Registered {formatGithubTime(ghData?.createdAt || "2024-03-12T10:20:30Z")}</span>
                            </span>
                          </div>
                        </div>

                        {/* View Profile Action */}
                        <a
                          href="https://github.com/SHIVASIR"
                          target="_blank"
                          rel="noreferrer"
                          className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg text-xs font-bold text-white bg-[#24292f] hover:bg-[#1a1d22] dark:bg-zinc-850 dark:hover:bg-zinc-700 shadow-sm transition-all text-center mt-5"
                        >
                          <Github className="h-4 w-4" />
                          <span>View GitHub Profile</span>
                          <ChevronRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>

                    {/* Bento Box: GitHub Trophy Cases */}
                    <div className="p-6 rounded-2xl border border-gray-200/80 dark:border-zinc-800 bg-slate-50/40 dark:bg-zinc-900/10 backdrop-blur-md shadow-sm">
                      <div className="flex items-center space-x-2 mb-4">
                        <Trophy className="h-4.5 w-4.5 text-amber-500 shrink-0" />
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">GitHub Interactive Trophies</h4>
                      </div>

                      <div className="grid grid-cols-2 gap-3.5">
                        {/* Trophy 1 */}
                        <div className={`p-3 rounded-xl border flex flex-col justify-between text-left shadow-sm transition-all ${contributionsTrophy.color}`}>
                          <div className="flex justify-between items-start">
                            <Flame className="h-5 w-5" />
                            <span className="text-xs font-extrabold font-mono border rounded px-1 min-w-[20px] text-center">{contributionsTrophy.rank}</span>
                          </div>
                          <div className="mt-3">
                            <h5 className="text-[11px] font-extrabold text-slate-800 dark:text-zinc-200 leading-none">{contributionsTrophy.title}</h5>
                            <p className="text-[9px] opacity-75 mt-0.5 leading-tight">{contributionsTrophy.desc}</p>
                          </div>
                        </div>

                        {/* Trophy 2 */}
                        <div className={`p-3 rounded-xl border flex flex-col justify-between text-left shadow-sm transition-all ${starsTrophy.color}`}>
                          <div className="flex justify-between items-start">
                            <Star className="h-5 w-5" />
                            <span className="text-xs font-extrabold font-mono border rounded px-1 min-w-[20px] text-center">{starsTrophy.rank}</span>
                          </div>
                          <div className="mt-3">
                            <h5 className="text-[11px] font-extrabold text-slate-800 dark:text-zinc-200 leading-none">{starsTrophy.title}</h5>
                            <p className="text-[9px] opacity-75 mt-0.5 leading-tight">{starsTrophy.desc}</p>
                          </div>
                        </div>

                        {/* Trophy 3 */}
                        <div className={`p-3 rounded-xl border flex flex-col justify-between text-left shadow-sm transition-all ${streakTrophy.color}`}>
                          <div className="flex justify-between items-start">
                            <Award className="h-5 w-5" />
                            <span className="text-xs font-extrabold font-mono border rounded px-1 min-w-[20px] text-center">{streakTrophy.rank}</span>
                          </div>
                          <div className="mt-3">
                            <h5 className="text-[11px] font-extrabold text-slate-800 dark:text-zinc-200 leading-none">{streakTrophy.title}</h5>
                            <p className="text-[9px] opacity-75 mt-0.5 leading-tight">{streakTrophy.desc}</p>
                          </div>
                        </div>

                        {/* Trophy 4 */}
                        <div className={`p-3 rounded-xl border flex flex-col justify-between text-left shadow-sm transition-all ${langsTrophy.color}`}>
                          <div className="flex justify-between items-start">
                            <Code2 className="h-5 w-5" />
                            <span className="text-xs font-extrabold font-mono border rounded px-1 min-w-[20px] text-center">{langsTrophy.rank}</span>
                          </div>
                          <div className="mt-3">
                            <h5 className="text-[11px] font-extrabold text-slate-800 dark:text-zinc-200 leading-none">{langsTrophy.title}</h5>
                            <p className="text-[9px] opacity-75 mt-0.5 leading-tight">{langsTrophy.desc}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* RIGHT BODY WORKSPACE: Heatmap, RecruiterInsights, RepoGrid, RecentEvents */}
                  <div className="lg:col-span-8 space-y-6">
                    
                    {/* 1. Recruiter-Focused Developer Insights */}
                    <div className="p-6 rounded-2xl border border-gray-200/80 dark:border-zinc-800 bg-slate-50/40 dark:bg-zinc-900/10 backdrop-blur-md shadow-sm text-left">
                      <div className="flex items-center space-x-2 mb-4">
                        <Sparkles className="h-4.5 w-4.5 text-blue-500 shrink-0" />
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Recruiter Insights & Developer DNA</h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Analytics Panel */}
                        <div className="space-y-3 p-4 rounded-xl border border-gray-150 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/40">
                          <h5 className="text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider font-mono">TECHNICAL METRICS SUMMARY</h5>
                          
                          <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                            <div>
                              <span className="text-slate-400 block pb-0.5">Languages Mix Index:</span>
                              <span className="font-extrabold text-slate-800 dark:text-zinc-100 font-mono text-[13px]">{ghLangsCount} Paradigms</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block pb-0.5">Repository Impact KPI:</span>
                              <span className="font-extrabold text-slate-800 dark:text-zinc-100 font-mono text-[13px]">{repositoryImpactScore} Pts</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block pb-0.5">Average Stars Density:</span>
                              <span className="font-extrabold text-slate-800 dark:text-zinc-100 font-mono text-[13px]">{ghData ? (ghData.totalStars / Math.max(1, ghData.repos.length)).toFixed(2) : "0.55"} Stars/Repo</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block pb-0.5">Seniority Age Class:</span>
                              <span className="font-extrabold text-slate-800 dark:text-zinc-100 font-mono text-[13px]">{yearsActive} Yrs Active Growth</span>
                            </div>
                          </div>
                        </div>

                        {/* DNA Trait designations */}
                        <div className="space-y-3 p-4 rounded-xl border border-gray-150 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/40">
                          <h5 className="text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider font-mono">RECRUITER DNA MATCH KEY</h5>
                          
                          <div className="space-y-2.5 text-xs text-slate-600 dark:text-zinc-400">
                            <div className="flex items-center space-x-2">
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                              <span><strong>Multi-lingual Engineering:</strong> Proven core focus on Py/C++ systems.</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                              <span><strong>Highly Motivated Coder:</strong> {ghTotalContributions} Git commits in 1 yr, demonstrating remarkable production velocity.</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                              <span><strong>Clean Arch Advocate:</strong> Custom DB optimization and ML models built with 100% test transparency.</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2. Full-Width 12-Month GitHub Contribution Graph */}
                    <div className="p-6 rounded-2xl border border-gray-200/80 dark:border-zinc-800 bg-slate-50/40 dark:bg-zinc-900/10 backdrop-blur-md shadow-sm text-left">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-zinc-150 dark:border-zinc-800 pb-3 mb-1">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-[#24292f] dark:text-zinc-300" />
                          <span className="font-bold text-slate-900 dark:text-white text-xs tracking-wider uppercase font-mono">
                            GitHub Active Contribution Stream Heatmap
                          </span>
                        </div>

                        {/* Streaks pill badges */}
                        <div className="flex items-center space-x-2 text-[10px]">
                          <div className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/25 px-2.5 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-950/30 font-mono">
                            <Flame className="h-3 w-3 animate-pulse" />
                            <span>Current Streak: {ghData?.currentStreak ?? 4} Days</span>
                          </div>
                          <div className="flex items-center space-x-1 text-amber-650 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-950/25 px-2.5 py-0.5 rounded-full border border-amber-100 dark:border-amber-950/30 font-mono font-bold">
                            <Trophy className="h-3 w-3" />
                            <span>Longest Streak: {ghData?.longestStreak ?? 21} Days</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                        {/* Graph container */}
                        <div className="lg:col-span-9 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800 max-w-full">
                          <div className="min-w-[730px] pt-1">
                            {/* Heatmap interactive columns */}
                            {ghData?.calendar && ghData.calendar.length > 0 ? (
                              <div className="grid grid-cols-[25px_1fr] items-start pt-2">
                                {/* Row indicators for Day Labels */}
                                <div className="flex flex-col gap-[3px] select-none pt-[1px]">
                                  {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((lbl, idx) => (
                                    <div key={idx} className="h-[10px] text-[8.5px] text-zinc-400 dark:text-zinc-650 font-bold leading-none flex items-center pr-1.5">
                                      {lbl}
                                    </div>
                                  ))}
                                </div>

                                {/* Columns of Weeks */}
                                <div className="flex flex-row gap-[3px]">
                                  {Array.from({ length: Math.ceil(ghData.calendar.length / 7) }).map((_, colIdx) => {
                                    const colDays = ghData.calendar.slice(colIdx * 7, colIdx * 7 + 7);
                                    return (
                                      <div key={colIdx} className="flex flex-col gap-[3px] shrink-0">
                                        {colDays.map((day, rowIdx) => {
                                          return (
                                            <div
                                              key={rowIdx}
                                              className={`h-[10px] w-[10px] rounded-[1px] transition-all relative group cursor-pointer ${
                                                getGithubHeatmapColor(day.level, colIdx, rowIdx)
                                              }`}
                                            >
                                              {/* High fidelity popup tooltip */}
                                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 hidden group-hover:block bg-zinc-950 text-white text-[9px] font-semibold py-1 px-2 rounded shadow-lg whitespace-nowrap z-50 pointer-events-none border border-zinc-700 font-sans">
                                                {day.count} commit(s) on {day.date}
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center p-8 text-xs text-slate-450 border border-dashed rounded-lg border-gray-300 dark:border-zinc-800">
                                <span>No calendar dates parsed. Toggle sync to refresh profile.</span>
                              </div>
                            )}

                            {/* Legend keys & labels */}
                            <div className="flex justify-between items-center text-[9.5px] text-zinc-400 mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-900 w-full">
                              <div>
                                <span>Learn more about contributing activity.</span>
                              </div>
                              <div className="flex items-center space-x-1.5">
                                <span>Less</span>
                                <div className="w-2.5 h-2.5 rounded-[1px] bg-zinc-100 dark:bg-zinc-900 border border-transparent dark:border-zinc-902" />
                                <div className="w-2.5 h-2.5 rounded-[1px] bg-[#9be9a8] dark:bg-[#0e4429]" />
                                <div className="w-2.5 h-2.5 rounded-[1px] bg-[#40c463] dark:bg-[#006d32]" />
                                <div className="w-2.5 h-2.5 rounded-[1px] bg-[#30a14e] dark:bg-[#26a641]" />
                                <div className="w-2.5 h-2.5 rounded-[1px] bg-[#216e39] dark:bg-[#39d353]" />
                                <span>More</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Contribution Snake Game */}
                        <div className="lg:col-span-3 p-4 bg-white dark:bg-zinc-950/80 border border-gray-150 dark:border-zinc-800/80 rounded-xl flex flex-col justify-between h-full space-y-3.5">
                          <div>
                            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800 dark:text-zinc-200">
                              <Activity className="h-4 w-4 text-rose-500 animate-pulse" />
                              <span>GitHub Snake Arena</span>
                            </div>
                            <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                              Run the automated AI greedy snake to eat commit green cells and accumulate score points!
                            </p>
                          </div>

                          {isSnakeActive && (
                            <div className="p-2.5 bg-slate-50 dark:bg-zinc-900 rounded-lg flex justify-between items-center text-[11px] font-mono border dark:border-zinc-800 text-slate-700 dark:text-zinc-300">
                              <span className="font-bold flex items-center space-x-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                                <span>Munch Score:</span>
                              </span>
                              <span className="font-extrabold text-indigo-600 dark:text-indigo-400">{snakeScore} pts</span>
                            </div>
                          )}

                          <div className="flex gap-2 text-xs">
                            {isSnakeActive ? (
                              <button
                                onClick={() => setIsSnakeActive(false)}
                                className="flex-1 flex items-center justify-center space-x-1.5 py-1.5 px-3 rounded bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-200 transition font-semibold"
                              >
                                <Pause className="h-3 w-3" />
                                <span>Pause</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => setIsSnakeActive(true)}
                                className="flex-1 flex items-center justify-center space-x-1.5 py-1.5 px-3 rounded bg-emerald-500 hover:bg-emerald-400 text-white transition font-bold"
                              >
                                <Play className="h-3 w-3" />
                                <span>Run Snake</span>
                              </button>
                            )}

                            <button
                              onClick={resetSnakeGame}
                              className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-400 dark:text-zinc-300 transition"
                              title="Reset Arena"
                            >
                              <RotateCcw className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 3. Repo stack language percentages and Repo Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                      
                      {/* Language Mix stacked-bar */}
                      <div className="p-5 rounded-2xl border border-gray-200/80 dark:border-zinc-800 bg-slate-50/40 dark:bg-zinc-900/10 backdrop-blur-md shadow-sm text-left md:col-span-5 h-full flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center space-x-1.5 text-xs uppercase font-bold text-slate-750 dark:text-slate-300 tracking-wider">
                            <Code2 className="h-4 w-4 text-blue-500" />
                            <span>Repository Language Mix</span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                            Relative aggregate byte usage mapped from personal non-fork repositories.
                          </p>
                        </div>

                        {/* Percentage mix bar */}
                        {ghData?.topLanguages && ghData.topLanguages.length > 0 ? (
                          <div className="space-y-4 pt-1">
                            {/* Stacked bar */}
                            <div className="h-3.5 w-full rounded-full overflow-hidden flex shadow-inner">
                              {ghData.topLanguages.slice(0, 4).map((lang) => (
                                <div
                                  key={lang.name}
                                  style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                                  title={`${lang.name}: ${lang.percentage}%`}
                                />
                              ))}
                            </div>

                            {/* Legendary grid key */}
                            <div className="grid grid-cols-2 gap-3.5 pt-1 text-xs">
                              {ghData.topLanguages.slice(0, 4).map((lang) => (
                                <div
                                  key={lang.name}
                                  className="flex items-center space-x-2 font-semibold text-slate-650 dark:text-slate-300"
                                >
                                  <span className="w-2.5 h-2.5 rounded-full inline-block border border-black/5" style={{ backgroundColor: lang.color }} />
                                  <span className="truncate">
                                    {lang.name} <span className="font-mono text-[10px] text-slate-450 dark:text-slate-500 font-medium">({lang.percentage}%)</span>
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="py-4 text-xs text-slate-400">Loading language profiles...</div>
                        )}
                      </div>

                      {/* Top Repo Cards (Pinned & highly-starred) */}
                      <div className="md:col-span-12 space-y-4 text-left">
                        <div className="flex items-center space-x-1.5">
                          <BookOpen className="h-4.5 w-4.5 text-blue-500 shrink-0" />
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Featured & Pinned Repositories</h4>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {ghData?.repos && ghData.repos.length > 0 ? (
                            ghData.repos.slice(0, 4).map((repo) => (
                              <div
                                key={repo.name}
                                className="p-5 rounded-xl border border-gray-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 hover:border-blue-500/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                              >
                                <div className="space-y-1.5">
                                  <div className="flex items-center justify-between">
                                    <h5 className="font-bold text-slate-800 dark:text-zinc-200 group-hover:text-blue-500 transition-colors truncate max-w-[210px]">
                                      <a href={repo.url} target="_blank" rel="noreferrer" className="hover:underline">
                                        {repo.name}
                                      </a>
                                    </h5>
                                    {repo.pinned && (
                                      <span className="text-[8px] font-mono uppercase bg-slate-100 dark:bg-zinc-800 text-slate-500 rounded-md px-1.5 py-0.5 border border-slate-200/40 dark:border-zinc-700/60 font-bold shrink-0">
                                        PINNED
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-slate-550 dark:text-zinc-400 leading-normal line-clamp-2">
                                    {repo.description}
                                  </p>
                                </div>

                                <div className="flex items-center justify-between pt-2 text-[10.5px] font-semibold text-slate-500 dark:text-zinc-400 border-t border-gray-50 dark:border-zinc-900 font-mono">
                                  <div className="flex items-center space-x-3">
                                    <span className="flex items-center space-x-1">
                                      <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: getGithubLanguageColor(repo.language) }} />
                                      <span>{repo.language}</span>
                                    </span>
                                    <span className="flex items-center space-x-0.5">
                                      <Star className="h-3.5 w-3.5 text-zinc-400" />
                                      <span>{repo.stars}</span>
                                    </span>
                                    <span className="flex items-center space-x-0.5">
                                      <GitFork className="h-3.5 w-3.5 text-zinc-400" />
                                      <span>{repo.forks}</span>
                                    </span>
                                  </div>
                                  <span className="text-[9.5px] text-slate-400">
                                    Size: {(repo.size / 1024).toFixed(1)} MB
                                  </span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="col-span-2 text-xs text-slate-400 border border-dashed rounded-lg p-5 border-gray-300 dark:border-zinc-800 text-center">
                              Loading featured github repositories...
                            </div>
                          )}
                        </div>
                      </div>

                    </div>

                    {/* 4. Live Events / Activity Feed */}
                    <div className="p-6 rounded-2xl border border-gray-200/80 dark:border-zinc-800 bg-slate-50/40 dark:bg-zinc-900/10 backdrop-blur-md shadow-sm text-left text-xs">
                      <div className="flex items-center space-x-1.5 mb-4">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Recent Git Commit Activity Stream</h4>
                      </div>

                      <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                        {ghData?.events && ghData.events.length > 0 ? (
                          ghData.events.slice(0, 5).map((ev) => (
                            <div
                              key={ev.id}
                              className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-zinc-900/60 last:border-0"
                            >
                              <div className="truncate pr-4 flex items-center space-x-2.5">
                                <span className="p-1 px-1.5 rounded bg-slate-100 dark:bg-zinc-900 border dark:border-zinc-850 flex items-center justify-center shrink-0">
                                  {getGithubEventIcon(ev.type)}
                                </span>
                                <span className="font-bold text-slate-700 dark:text-zinc-300 truncate max-w-[420px] leading-snug">
                                  {ev.message}
                                </span>
                              </div>
                              <span className="text-[9.5px] font-mono text-zinc-400 shrink-0 font-bold whitespace-nowrap">
                                {getRelativeTime(ev.date ? String(new Date(ev.date).getTime() / 1000) : "0")}
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="py-4 text-xs text-slate-400 text-center">No recent commit logs found.</div>
                        )}
                      </div>
                    </div>

                  </div>

                </div>
              )}
            </div>
          )}

          {/* ==================== LEETCODE TAB ==================== */}
          {activeTab === 'leetcode' && (
            <div className="animate-fade-in">
              {lcLoading && !lcData ? (
                // Skeleton Loader
                <div className="p-6 md:p-8 rounded-3xl border border-gray-200/60 dark:border-zinc-800 bg-slate-50/10 dark:bg-zinc-900/40 backdrop-blur-xl animate-pulse h-96" />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
                  {/* Left stats summary panel */}
                  <div className="lg:col-span-6 p-6 md:p-8 rounded-3xl border border-gray-200/60 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/40 backdrop-blur-xl shadow-sm flex flex-col justify-between">
                    <div className="space-y-6">
                      {/* Error Banner */}
                      {lcError && (
                        <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50 dark:border-rose-950/40 dark:bg-rose-950/15 flex items-start space-x-2.5 text-rose-600 dark:text-rose-400 text-xs">
                          <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                          <div className="text-left">
                            <div className="font-bold uppercase tracking-wider text-[10px]">Connection Failure</div>
                            <p className="text-[11px] leading-normal opacity-90 mt-0.5">Showing cached baseline credentials. {lcError}</p>
                            <button
                              onClick={() => fetchLeetcodeDetails()}
                              className="text-[11px] font-bold underline mt-1.5 focus:outline-none flex items-center space-x-1 hover:opacity-80"
                            >
                              <RefreshCw className="h-3 w-3" />
                              <span>Re-fetch from LeetCode</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Profile card metadata header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-left">
                          {lcData?.avatar ? (
                            <div className="relative">
                              <img
                                src={lcData.avatar}
                                alt="LeetCode Avatar"
                                className="h-11 w-11 rounded-xl object-cover ring-1 ring-amber-500/30"
                                referrerPolicy="no-referrer"
                              />
                              <span className="absolute -bottom-1.5 -right-1 p-0.5 rounded-md bg-amber-500 text-white font-mono text-[8px] font-bold">
                                PRO
                              </span>
                            </div>
                          ) : (
                            <span className="p-2.5 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center">
                              <Trophy className="h-5 w-5" />
                            </span>
                          )}
                          <div>
                            <h3 className="font-bold text-slate-950 dark:text-white leading-none">
                              {lcData?.realName || 'LeetCode Profile'}
                            </h3>
                            <a
                              href={lcData ? `https://leetcode.com/u/${lcData.username}/` : staticLeetcode.profileUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] font-semibold text-amber-500 hover:underline inline-flex items-center mt-1"
                            >
                              <span>leetcode.com/u/{lcData?.username || 'shiwanshu0711'}</span>
                              <ExternalLink className="h-2.5 w-2.5 ml-1" />
                            </a>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-slate-455 font-mono font-medium">GLOBAL RANKING</div>
                          <div className="text-sm font-extrabold text-slate-800 dark:text-slate-200 font-mono">
                            #{lcData?.ranking ? Number(lcData.ranking).toLocaleString() : staticLeetcode.ranking}
                          </div>
                        </div>
                      </div>

                      {/* Progress Stats */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center bg-white dark:bg-zinc-950/85 border border-gray-150 dark:border-zinc-805 p-5 rounded-2xl">
                        {/* Circle donut */}
                        <div className="sm:col-span-5 flex flex-col items-center justify-center relative">
                          <div className="relative flex items-center justify-center h-28 w-28">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle
                                cx="56"
                                cy="56"
                                r="46"
                                strokeWidth="6"
                                stroke="currentColor"
                                className="text-slate-100 dark:text-zinc-800"
                                fill="transparent"
                              />
                              <circle
                                cx="56"
                                cy="56"
                                r="46"
                                strokeWidth="7"
                                strokeDasharray="289"
                                strokeDashoffset={
                                  289 -
                                  (289 * (lcData?.solved.total || staticLeetcode.solved)) /
                                    (lcData?.solved.totalQuestions || 3200)
                                }
                                strokeLinecap="round"
                                stroke="currentColor"
                                className="text-amber-500 dark:text-amber-450 transition-all duration-1000"
                                fill="transparent"
                              />
                            </svg>
                            <div className="absolute text-center">
                              <div className="text-xl font-extrabold text-slate-950 dark:text-white font-mono leading-none">
                                {lcData?.solved.total || staticLeetcode.solved}
                              </div>
                              <div className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mt-1">Solved</div>
                            </div>
                          </div>
                          {lcData?.solved.acceptanceRate && (
                            <div className="mt-2 text-[10px] font-mono font-bold text-zinc-500 dark:text-zinc-400">
                              <span>AC Rate: {lcData.solved.acceptanceRate}</span>
                            </div>
                          )}
                        </div>

                        {/* Breakdown bars */}
                        <div className="sm:col-span-7 space-y-3.5 text-left text-xs">
                          <div className="space-y-1">
                            <div className="flex justify-between font-semibold">
                              <span className="text-emerald-550 dark:text-emerald-450 uppercase tracking-wide">Easy</span>
                              <span className="text-slate-500 font-mono">
                                {lcData?.solved.easy ?? staticLeetcode.easy}{' '}
                                <span className="text-slate-400 text-[10px]">
                                  / {lcData?.solved.totalEasy ?? 800}
                                </span>
                              </span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-150 dark:bg-zinc-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-500 rounded-full transition-all"
                                style={{
                                  width: `${
                                    (((lcData?.solved.easy ?? staticLeetcode.easy) || 0) /
                                      ((lcData?.solved.totalEasy ?? 800) || 1)) *
                                    100
                                  }%`,
                                }}
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between font-semibold">
                              <span className="text-amber-500 uppercase tracking-wide">Medium</span>
                              <span className="text-slate-500 font-mono">
                                {lcData?.solved.medium ?? staticLeetcode.medium}{' '}
                                <span className="text-slate-400 text-[10px]">
                                  / {lcData?.solved.totalMedium ?? 1600}
                                </span>
                              </span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-150 dark:bg-zinc-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-amber-500 rounded-full transition-all"
                                style={{
                                  width: `${
                                    (((lcData?.solved.medium ?? staticLeetcode.medium) || 0) /
                                      ((lcData?.solved.totalMedium ?? 1600) || 1)) *
                                    100
                                  }%`,
                                }}
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between font-semibold">
                              <span className="text-rose-500 uppercase tracking-wide">Hard</span>
                              <span className="text-slate-500 font-mono">
                                {lcData?.solved.hard ?? staticLeetcode.hard}{' '}
                                <span className="text-slate-400 text-[10px]">
                                  / {lcData?.solved.totalHard ?? 800}
                                </span>
                              </span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-150 dark:bg-zinc-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-rose-500 rounded-full transition-all"
                                style={{
                                  width: `${
                                    (((lcData?.solved.hard ?? staticLeetcode.hard) || 0) /
                                      ((lcData?.solved.totalHard ?? 800) || 1)) *
                                    100
                                  }%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Streaks indices */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border border-gray-100 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/40 flex items-center space-x-3 text-left">
                          <div className="p-2 rounded-lg bg-teal-500/10 text-teal-500 border border-teal-500/20">
                            <Award className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                              CONTEST RATING
                            </div>
                            <div className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
                              {lcData?.contest ? lcData.contest.rating : staticLeetcode.contestRating}
                            </div>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl border border-gray-100 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/40 flex items-center space-x-3 text-left">
                          <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500 border border-rose-500/20 animate-pulse">
                            <Flame className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                              STREAK ACTIVE COUNT
                            </div>
                            <div className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
                              {currentStreakVal} days
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="pt-6 border-t border-gray-200/50 dark:border-zinc-800 mt-6 w-full">
                      <a
                        href={lcData ? `https://leetcode.com/u/${lcData.username}/` : staticLeetcode.profileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg text-xs font-bold text-white bg-amber-500 hover:bg-amber-450 shadow-sm transition-all text-center"
                      >
                        <span>Navigate to LeetCode Profile</span>
                        <ChevronRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  {/* Right side: Heatmap & submissions log */}
                  <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
                    
                    {/* LeetCode Heatmap */}
                    <div className="space-y-4 bg-slate-50/40 dark:bg-zinc-900/10 border border-gray-200/60 dark:border-zinc-800 p-5 rounded-2xl text-left">
                      <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800/60 pb-3">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-zinc-500" />
                          <span className="font-bold text-slate-900 dark:text-white text-xs tracking-wide uppercase font-mono">
                            LeetCode Heatmap
                          </span>
                        </div>

                        <div className="flex items-center space-x-2 text-[10px] font-mono">
                          <div className="flex items-center space-x-1 text-emerald-650 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-950/30">
                            <Flame className="h-3 w-3 animate-pulse" />
                            <span>Active Days: {lcData?.calendar?.totalActiveDays || activeDaysForYear} Days</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-[1fr_40px] gap-2 items-start pt-1 font-mono">
                        {/* Cell Grid scrollable container */}
                        <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
                          <div className="min-w-[480px]">
                            <div className="grid grid-cols-[25px_1fr] items-start">
                              {/* Left row indicator */}
                              <div className="flex flex-col gap-[3px] select-none pt-[1px]">
                                {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((lbl, idx) => (
                                  <div key={idx} className="h-[9.5px] text-[8.5px] text-zinc-400 font-bold leading-none flex items-center pr-1">
                                    {lbl}
                                  </div>
                                ))}
                              </div>

                              {/* Columns */}
                              <div className="flex flex-row gap-[3px]">
                                {weeks.slice(-36).map((week, colIdx) => (
                                  <div key={colIdx} className="flex flex-col gap-[3px] shrink-0">
                                    {week.map((date, rowIdx) => {
                                      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                                      const count = countMap.get(dateStr) || 0;
                                      const intensity = getIntensity(count);
                                      return (
                                        <div
                                          key={rowIdx}
                                          className={`h-[9.5px] w-[9.5px] rounded-[1.5px] transition-all relative group cursor-pointer ${
                                            getLeetcodeHeatmapColor(intensity)
                                          }`}
                                        >
                                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-zinc-950 text-white text-[9px] font-semibold py-0.5 px-1.5 rounded shadow-lg whitespace-nowrap z-50 pointer-events-none">
                                            {count} submission(s) on {dateStr}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Year switcher column */}
                        <div className="flex flex-col gap-1">
                          {activeYears.map((year) => (
                            <button
                              key={year}
                              onClick={() => setSelectedYear(year)}
                              className={`px-1 py-1 rounded text-[9.5px] font-bold tracking-tight text-center ${
                                selectedYear === year
                                  ? 'bg-amber-500/15 text-amber-500 border border-amber-500/20'
                                  : 'text-zinc-400 hover:bg-zinc-150 dark:hover:bg-zinc-900 hover:text-zinc-700'
                              }`}
                            >
                              {year}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Acquired Badges */}
                    {lcData?.badges && lcData.badges.length > 0 && (
                      <div className="p-4 rounded-xl border border-gray-200/60 dark:border-zinc-800 bg-slate-50/20 dark:bg-zinc-900/10 text-left">
                        <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider mb-2.5 font-mono">
                          LeetCode Badges ({lcData.badges.length})
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                          {lcData.badges.slice(0, 5).map((badge) => (
                            <div
                              key={badge.id}
                              className="relative group flex items-center justify-center p-1 bg-slate-100 dark:bg-zinc-900 rounded-lg w-10 h-10 border dark:border-zinc-850 shadow-sm"
                              title={badge.hoverText}
                            >
                              <img
                                src={badge.icon}
                                alt={badge.displayName}
                                className="w-8 h-8 object-contain"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recent Submissions Feed */}
                    {lcData?.recentSubmissions && lcData.recentSubmissions.length > 0 && (
                      <div className="p-4 rounded-xl border border-gray-200/60 dark:border-zinc-800 bg-slate-50/20 dark:bg-zinc-900/10 text-left space-y-2.5 h-full flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider font-mono mb-2">
                            Recent LeetCode Handshakes
                          </div>
                          <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
                            {lcData.recentSubmissions.slice(0, 3).map((sub, idx) => (
                              <div
                                key={idx}
                                className="flex justify-between items-center py-1 text-xs border-b border-gray-100 dark:border-zinc-900/60 last:border-0"
                              >
                                <div className="truncate pr-4 flex items-center space-x-1.5 font-sans">
                                  <span
                                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                      sub.statusDisplay === 'Accepted' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                                    }`}
                                  />
                                  <span className="font-bold text-slate-700 dark:text-zinc-300 truncate max-w-[200px]">
                                    {sub.title}
                                  </span>
                                  <span className="text-[8.5px] px-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-500 rounded font-mono font-bold uppercase shrink-0">
                                    {sub.lang}
                                  </span>
                                </div>
                                <span className="text-[9px] font-mono text-zinc-400 font-bold whitespace-nowrap">
                                  {getRelativeTime(sub.timestamp)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* --- COMMON OTHER NETWORKING FOOTER GRIDS --- */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xl border border-gray-200/60 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/10 flex items-center justify-between hover:border-blue-500/50 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                <Layers className="h-4.5 w-4.5" />
              </div>
              <div className="text-left font-sans">
                <div className="text-[9px] text-slate-400 font-bold tracking-wider uppercase">
                  NETWORKING
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-blue-500 transition-colors">
                  LinkedIn Profile
                </div>
              </div>
            </div>
          </a>

          <div className="p-4 rounded-xl border border-gray-200/60 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/10 flex items-center justify-between text-left">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                <Code2 className="h-4.5 w-4.5" />
              </div>
              <div className="font-sans">
                <div className="text-[9px] text-slate-400 font-bold tracking-wider uppercase">
                  CODEFORCES
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-white">Profile ID Pending</div>
              </div>
            </div>
            <span className="text-[9px] font-mono text-slate-400 tracking-wider font-bold">PREPR</span>
          </div>

          <div className="p-4 rounded-xl border border-gray-200/60 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/10 flex items-center justify-between text-left">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                <Award className="h-4.5 w-4.5" />
              </div>
              <div className="font-sans">
                <div className="text-[9px] text-slate-400 font-bold tracking-wider uppercase">
                  HACKERRANK
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-white">Python / SQL Solved</div>
              </div>
            </div>
            <span className="text-[9px] font-mono text-emerald-550 dark:text-emerald-400 font-bold">ACTIVE</span>
          </div>

          <div className="p-4 rounded-xl border border-gray-200/60 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/10 flex items-center justify-between text-left">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                <ChevronRight className="h-4.5 w-4.5" />
              </div>
              <div className="font-sans">
                <div className="text-[9px] text-[#b07219] font-bold tracking-wider uppercase">
                  GEEKSFORGEEKS
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-white">DSA Foundations</div>
              </div>
            </div>
            <span className="text-[9px] font-mono text-slate-400 tracking-wider font-bold">PREPR</span>
          </div>
        </div>

      </div>
    </section>
  );
}
