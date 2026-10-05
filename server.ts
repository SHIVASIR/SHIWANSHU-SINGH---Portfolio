import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Multi-turn Chat API Endpoint using Gemini
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, systemInstruction, model } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    // Determine target model based on task complexity
    let targetModel = model || "gemini-3.5-flash";
    if (targetModel === "gemini-3.1-pro-preview" || targetModel === "pro") {
      targetModel = "gemini-3.1-pro-preview";
    } else if (targetModel === "gemini-3.1-flash-lite" || targetModel === "lite" || targetModel === "fast") {
      targetModel = "gemini-3.1-flash-lite";
    } else {
      targetModel = "gemini-3.5-flash";
    }

    const ai = getGeminiClient();

    const latestMessage = messages[messages.length - 1];
    const latestText = latestMessage.text || latestMessage.content || "";

    // Fallback if API key is not configured in environment
    if (!ai) {
      const lowerQuery = latestText.toLowerCase();
      let fallbackAnswer = "Shiwanshu Kumar Singh is a Computer Science undergraduate specializing in Machine Learning, Data Science, and Cloud Architecture. He serves as Team Lead for Awishkari in Smart India Hackathon (SIH 2025), has solved 240+ LeetCode problems, and interned in Data Science at MyDailyWork.";

      if (lowerQuery.includes("project") || lowerQuery.includes("ml") || lowerQuery.includes("machine learning")) {
        fallbackAnswer = "Shiwanshu's featured Machine Learning projects include:\n1. **Credit Card Fraud Detection System**: Built with LightGBM, Random Forest, and SMOTE for imbalanced transaction analysis.\n2. **Cloud-Native ML Inference Engine**: Docker containerized deployment model API for real-time predictions.\n3. **Image Classification Pipeline**: High-accuracy CNN trained on benchmark vision datasets.";
      } else if (lowerQuery.includes("sih") || lowerQuery.includes("hackathon") || lowerQuery.includes("lead")) {
        fallbackAnswer = "Shiwanshu is the **Team Leader for Awishkari** at Smart India Hackathon (SIH) 2025, guiding a team of 6 software engineers in architecting scalable solutions for government problem statements.";
      } else if (lowerQuery.includes("skill") || lowerQuery.includes("stack") || lowerQuery.includes("tech")) {
        fallbackAnswer = "Shiwanshu's Technical Stack:\n• **Languages**: C++, Python, TypeScript, SQL\n• **Cloud & DevOps**: AWS, Docker, Linux Administration, Git\n• **ML/Data**: PyTorch, Scikit-Learn, LightGBM, Pandas, NumPy\n• **Web**: React, Node.js, Express, Tailwind CSS";
      }

      return res.json({ 
        text: `${fallbackAnswer}\n\n*(Note: To unlock live multi-turn AI responses powered by Gemini 3.5 Flash, set your \`GEMINI_API_KEY\` in the AI Studio Secrets panel.)*` 
      });
    }

    // Format previous turns for history
    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === "assistant" || msg.role === "model" ? "model" : "user",
      parts: [{ text: msg.text || msg.content || "" }],
    }));

    const chat = ai.chats.create({
      model: targetModel,
      config: {
        systemInstruction: systemInstruction || "You are Shiwanshu's AI Career Assistant & Portfolio Guide. Help recruiters and visitors learn about Shiwanshu Kumar Singh's Cloud Computing, Data Science, Machine Learning, and Software Engineering background with concise, professional, and friendly answers.",
      },
      history: history.length > 0 ? history : undefined,
    });

    const response = await chat.sendMessage({ message: latestText });

    res.json({ text: response.text });
  } catch (err: any) {
    console.error("Error in /api/chat:", err);
    res.status(500).json({ error: err.message || "Failed to generate AI response." });
  }
});

// Simple memory cache
let cacheData: any = null;
let cacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

// GitHub memory cache
let githubCacheData: any = null;
let githubCacheTime = 0;
const GITHUB_CACHE_DURATION = 15 * 60 * 1000; // 15 minutes cache

// GitHub languages colors helper
function getGithubLanguageColor(lang: string) {
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
}

// Fallback high-fidelity profile creator if GitHub locks or rate limits us
function getHighFidelityStaticFallback(username: string) {
  // Generate simulated contributions
  const mockCalendar: any[] = [];
  const today = new Date();
  
  // Fill past 365 days
  for (let i = 365; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    // Simulate commit distributions (semi random with active weekends and weekdays)
    const day = d.getDay();
    let level = 0;
    let count = 0;
    
    // active coder pattern
    const rand = Math.random();
    if (rand > 0.45) {
      level = Math.floor(Math.random() * 4) + 1;
      count = level === 1 ? 1 : level === 2 ? 3 : level === 3 ? 5 : 8;
    }
    
    mockCalendar.push({
      date: dateStr,
      level,
      count
    });
  }

  return {
    username: username || "SHIVASIR",
    name: "Shiwansh Kumar Singh",
    bio: "B.Tech CSE Student @BBDU | Software Engineer & Data Science Intern",
    avatarUrl: "https://avatars.githubusercontent.com/u/161474474?v=4",
    followers: 12,
    following: 15,
    publicRepos: 18,
    totalStars: 10,
    totalForks: 3,
    createdAt: "2024-03-12T10:20:30Z",
    topLanguages: [
      { name: "Python", percentage: 55, color: "#3572A5" },
      { name: "C++", percentage: 22, color: "#f34b7d" },
      { name: "JavaScript", percentage: 14, color: "#f1e05a" },
      { name: "SQL", percentage: 9, color: "#e38c00" }
    ],
    repos: [
      {
        name: "Credit-Card-Fraud-Detection",
        description: "Machine Learning models (LightGBM, Random Forest, SMOTE) built to detect highly imbalanced credit card fraud activities.",
        stars: 4,
        forks: 1,
        language: "Python",
        url: "https://github.com/SHIVASIR/Credit-Card-Fraud-Detection",
        pinned: true
      },
      {
        name: "Cloud-Native-Inference-Engine",
        description: "Scalable prediction microservice API for ML, containerized with Docker.",
        stars: 3,
        forks: 0,
        language: "Python",
        url: "https://github.com/SHIVASIR/Cloud-Native-Inference-Engine",
        pinned: true
      },
      {
        name: "Relational-Schema-Parser",
        description: "A custom C++ database parser simulating schema validation and queries optimized index indexing structure.",
        stars: 2,
        forks: 0,
        language: "C++",
        url: "https://github.com/SHIVASIR/Relational-Schema-Parser",
        pinned: true
      },
      {
        name: "Sales-Optimization-Dashboard",
        description: "React SPA presenting in-depth region sales trends and forecasted demand algorithms.",
        stars: 1,
        forks: 1,
        language: "JavaScript",
        url: "https://github.com/SHIVASIR/Sales-Optimization-Dashboard",
        pinned: true
      }
    ],
    pinnedRepos: [
      {
        name: "Credit-Card-Fraud-Detection",
        description: "Machine Learning models (LightGBM, Random Forest, SMOTE) built to detect highly imbalanced credit card fraud activities.",
        stars: 4,
        forks: 1,
        language: "Python",
        url: "https://github.com/SHIVASIR/Credit-Card-Fraud-Detection"
      },
      {
        name: "Cloud-Native-Inference-Engine",
        description: "Scalable prediction microservice API for ML, containerized with Docker.",
        stars: 3,
        forks: 0,
        language: "Python",
        url: "https://github.com/SHIVASIR/Cloud-Native-Inference-Engine"
      },
      {
        name: "Relational-Schema-Parser",
        description: "A custom C++ database parser simulating schema validation and queries optimized index indexing structure.",
        stars: 2,
        forks: 0,
        language: "C++",
        url: "https://github.com/SHIVASIR/Relational-Schema-Parser"
      },
      {
        name: "Sales-Optimization-Dashboard",
        description: "React SPA presenting in-depth region sales trends and forecasted demand algorithms.",
        stars: 1,
        forks: 1,
        language: "JavaScript",
        url: "https://github.com/SHIVASIR/Sales-Optimization-Dashboard"
      }
    ],
    contributionsThisYear: 320,
    longestStreak: 21,
    currentStreak: 4,
    calendar: mockCalendar,
    events: [
      { id: "e1", type: "PushEvent", repo: "SHIVASIR/Credit-Card-Fraud-Detection", message: "Pushed 2 commits to main: Refactored LightGBM model score weights", date: new Date().toISOString() },
      { id: "e2", type: "PushEvent", repo: "SHIVASIR/Relational-Schema-Parser", message: "Pushed 1 commit to master: Add indices search metrics and query tree parse nodes", date: new Date(Date.now() - 48*60*60*1000).toISOString() },
      { id: "e3", type: "CreateEvent", repo: "SHIVASIR/Cloud-Native-Inference-Engine", message: "Created branch master on repository", date: new Date(Date.now() - 72*60*60*1000).toISOString() }
    ],
    activityAnalytics: {
      commitHours: [0,0,0,0,1,3,0,5,10,12,8,2,4,9,14,12,18,5,2,4,2,0,0,0],
      totalCommitsInEvents: 54
    }
  };
}

app.get("/api/github", async (req, res) => {
  const username = (req.query.username as string) || "SHIVASIR";
  const now = Date.now();

  const useCache = username.toLowerCase() === "shivasir" && 
                   githubCacheData && 
                   (now - githubCacheTime < GITHUB_CACHE_DURATION);
  if (useCache) {
    return res.json({ ...githubCacheData, cached: true });
  }

  // Token helper
  const headers: any = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept: "application/vnd.github.v3+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    // 1. Fetch User Profile
    const userPromise = fetch(`https://api.github.com/users/${username}`, { headers })
      .then(r => {
        if (!r.ok) {
          throw new Error(`GitHub Profile API returned ${r.status}`);
        }
        return r.json();
      });

    // 2. Fetch User Repos (max 100)
    const reposPromise = fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers })
      .then(r => r.ok ? r.json() : []);

    // 3. Fetch User Events for commit activity
    const eventsPromise = fetch(`https://api.github.com/users/${username}/events`, { headers })
      .then(r => r.ok ? r.json() : []);

    // 4. Fetch Contributions Calendar from public HTML page
    const contributionsPromise = fetch(`https://github.com/users/${username}/contributions`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      }
    })
      .then(async r => {
        if (!r.ok) return "";
        return r.text();
      })
      .catch(() => "");

    // Resolve all parallel requests
    const [user, repos, events, contributionsHtml] = await Promise.all([
      userPromise,
      reposPromise,
      eventsPromise,
      contributionsPromise
    ]);

    // Parse Contributions HTML if successful
    let calendarDays: any[] = [];
    let totalContributions = 0;
    if (contributionsHtml) {
      // Robust regex for matching ContributionCalendar-day entries
      const dayRegex = /<(rect|td)[^>]*class="[^"]*ContributionCalendar-day[^"]*"[^>]*>/gi;
      const matches = contributionsHtml.match(dayRegex) || [];
      
      for (const tag of matches) {
        const dateMatch = tag.match(/data-date="([^"]+)"/i);
        const levelMatch = tag.match(/data-level="([^"]+)"/i);
        const countMatch = tag.match(/data-count="(\d+)"/i);

        if (dateMatch) {
          const date = dateMatch[1];
          const level = levelMatch ? parseInt(levelMatch[1]) : 0;
          const count = countMatch ? parseInt(countMatch[1]) : (level > 0 ? (level === 1 ? 1 : level === 2 ? 3 : level === 3 ? 6 : 10) : 0);
          calendarDays.push({ date, level, count });
        }
      }

      // Extract total contributions text
      const totalMatch = contributionsHtml.match(/(\d+(?:,\d+)*)\s+contributions\s+in\s+the\s+last\s+year/i);
      totalContributions = totalMatch ? parseInt(totalMatch[1].replace(/,/g, '')) : 0;
      if (totalContributions === 0) {
        totalContributions = calendarDays.reduce((sum, d) => sum + d.count, 0);
      }
    }

    // Process Repositories - filter forks
    const ownRepos = Array.isArray(repos) ? repos.filter((r: any) => !r.fork) : [];
    
    // Total stars calculation
    const totalStars = ownRepos.reduce((sum: number, r: any) => sum + (r.stargazers_count || 0), 0);
    const totalForks = ownRepos.reduce((sum: number, r: any) => sum + (r.forks_count || 0), 0);

    // Calculate Languages
    const langScores: Record<string, number> = {};
    ownRepos.forEach((r: any) => {
      if (r.language) {
        langScores[r.language] = (langScores[r.language] || 0) + (r.size || 1);
      }
    });
    const totalLangSize = Object.values(langScores).reduce((a, b) => a + b, 0);
    const topLanguages = Object.entries(langScores)
      .map(([name, size]) => ({
        name,
        percentage: totalLangSize > 0 ? Math.round((size / totalLangSize) * 100) : 0,
        color: getGithubLanguageColor(name)
      }))
      .sort((a, b) => b.percentage - a.percentage);

    // Dynamic streaks calculation from contributions dates
    const activeDates = new Set(calendarDays.filter(d => d.level > 0).map(d => d.date));
    const sortedActiveDates = [...activeDates].sort();
    
    let longestStreak = 0;
    let tempStreak = 0;
    let lastDate: string | null = null;

    for (const dateStr of sortedActiveDates) {
      if (lastDate === null) {
        tempStreak = 1;
      } else {
        const diffTime = Math.abs(new Date(dateStr).getTime() - new Date(lastDate).getTime());
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          tempStreak++;
        } else if (diffDays > 1) {
          if (tempStreak > longestStreak) longestStreak = tempStreak;
          tempStreak = 1;
        }
      }
      lastDate = dateStr;
    }
    if (tempStreak > longestStreak) longestStreak = tempStreak;

    // Current Streak calculation
    let currentStreak = 0;
    let curDate = new Date();
    const formatDate = (d: Date) => d.toISOString().split('T')[0];

    // Check today or yesterday
    if (activeDates.has(formatDate(curDate))) {
      while (activeDates.has(formatDate(curDate))) {
        currentStreak++;
        curDate.setDate(curDate.getDate() - 1);
      }
    } else {
      curDate.setDate(curDate.getDate() - 1); // check yesterday
      if (activeDates.has(formatDate(curDate))) {
        while (activeDates.has(formatDate(curDate))) {
          currentStreak++;
          curDate.setDate(curDate.getDate() - 1);
        }
      }
    }

    // Parse Pinned Repos if possible from HTML scraping fallback
    let pinnedRepos: string[] = [];
    try {
      const homeHtmlRes = await fetch(`https://github.com/${username}`);
      if (homeHtmlRes.ok) {
        const homeHtml = await homeHtmlRes.text();
        const pinRegex = /href="\/[A-Za-z0-9_.-]+\/([A-Za-z0-9_.-]+)"[^>]*class="[^"]*text-bold[^"\/]*"/gi;
        const potentialPins = Array.from(homeHtml.matchAll(pinRegex)).map(match => match[1]);
        pinnedRepos = Array.from(new Set(potentialPins)).slice(0, 6);
      }
    } catch (e) {
      console.error("Error matching pinned repos", e);
    }

    // Map own repos
    const mappedRepos = ownRepos.map((r: any) => ({
      name: r.name,
      description: r.description || "No description provided.",
      stars: r.stargazers_count || 0,
      forks: r.forks_count || 0,
      language: r.language || "Unknown",
      url: r.html_url,
      size: r.size,
      updatedAt: r.updated_at,
      pinned: pinnedRepos.includes(r.name)
    }))
    .sort((a,b) => b.stars - a.stars);

    // If parsing pinned yielded nothing, mark top 4 starred/updated as pinned
    if (!mappedRepos.some(r => r.pinned) && mappedRepos.length > 0) {
      mappedRepos.slice(0, 4).forEach(r => r.pinned = true);
    }

    // Calculate Commit Hours Distribution for developer insights
    let commitHours = Array(24).fill(0);
    let commitsCount = 0;
    if (Array.isArray(events)) {
      events.forEach((ev: any) => {
        if (ev.type === "PushEvent" && ev.payload?.commits) {
          const date = new Date(ev.created_at);
          const hr = date.getHours();
          commitHours[hr] += ev.payload.commits.length;
          commitsCount += ev.payload.commits.length;
        }
      });
    }

    // Process recent activity
    const processedEvents = Array.isArray(events) ? events.slice(0, 10).map((ev: any) => {
      let message = "";
      if (ev.type === "PushEvent" && ev.payload?.commits?.length > 0) {
        message = `Pushed ${ev.payload.commits.length} commit(s) to ${ev.repo.name.split("/")[1]}: "${ev.payload.commits[0].message}"`;
      } else if (ev.type === "CreateEvent") {
        message = `Created repository/branch ${ev.payload.ref || ""} in ${ev.repo.name.split("/")[1]}`;
      } else if (ev.type === "PullRequestEvent") {
        message = `${ev.payload.action.charAt(0).toUpperCase() + ev.payload.action.slice(1)} Pull Request #${ev.payload.number} in ${ev.repo.name.split("/")[1]}`;
      } else if (ev.type === "IssuesEvent") {
        message = `${ev.payload.action.charAt(0).toUpperCase() + ev.payload.action.slice(1)} issue #${ev.payload.issue?.number} in ${ev.repo.name.split("/")[1]}`;
      } else {
        message = `Activity (${ev.type}) in ${ev.repo.name}`;
      }
      return {
        id: ev.id,
        type: ev.type,
        repo: ev.repo.name,
        message,
        date: ev.created_at
      };
    }) : [];

    const compiledData = {
      username: user.login,
      name: user.name || user.login,
      bio: user.bio || "No bio provided.",
      avatarUrl: user.avatar_url,
      followers: user.followers || 0,
      following: user.following || 0,
      publicRepos: user.public_repos || 0,
      totalStars,
      totalForks,
      createdAt: user.created_at,
      topLanguages,
      repos: mappedRepos,
      pinnedRepos: mappedRepos.filter(r => r.pinned),
      contributionsThisYear: totalContributions,
      longestStreak: longestStreak || currentStreak,
      currentStreak,
      calendar: calendarDays,
      events: processedEvents,
      activityAnalytics: {
        commitHours,
        totalCommitsInEvents: commitsCount
      }
    };

    if (username.toLowerCase() === "shivasir") {
      githubCacheData = compiledData;
      githubCacheTime = Date.now();
    }

    return res.json({ ...compiledData, cached: false });
  } catch (error: any) {
    console.error("Error fetching live GitHub data, serving static fallback:", error);
    
    // Aggressive high fidelity static fallback for SHIVASIR
    const fallbackData = getHighFidelityStaticFallback(username);
    return res.json({ ...fallbackData, fallback: true, error: error.message });
  }
});

app.get("/api/leetcode", async (req, res) => {
  const username = (req.query.username as string) || "shiwanshu0711";
  
  const now = Date.now();
  if (username === "shiwanshu0711" && cacheData && (now - cacheTime < CACHE_DURATION)) {
    return res.json({ ...cacheData, cached: true });
  }

  try {
    const fetchGraphQL = async (query: string, variables: any) => {
      const response = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Referer": "https://leetcode.com",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        },
        body: JSON.stringify({ query, variables }),
      });
      if (!response.ok) {
        throw new Error(`LeetCode GraphQL error: ${response.statusText}`);
      }
      return response.json();
    };

    // Construct parallel queries
    const profileAndSolvedQuery = `
      query userProfileAndSolved($username: String!) {
        matchedUser(username: $username) {
          username
          profile {
            realName
            ranking
            userAvatar
            reputation
          }
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
            totalSubmissionNum {
              difficulty
              count
              submissions
            }
          }
        }
        allQuestionsCount {
          difficulty
          count
        }
      }
    `;

    const contestQuery = `
      query userContestRankingInfo($username: String!) {
        userContestRanking(username: $username) {
          attendedContestsCount
          rating
          globalRanking
          totalParticipants
          topPercentage
          badge {
            name
          }
        }
      }
    `;

    const submissionsQuery = `
      query recentSubmissions($username: String!, $limit: Int) {
        recentSubmissionList(username: $username, limit: $limit) {
          title
          titleSlug
          timestamp
          statusDisplay
          lang
        }
      }
    `;

    const calendarQuery = `
      query userProfileCalendar($username: String!) {
        matchedUser(username: $username) {
          userCalendar {
            activeYears
            streak
            totalActiveDays
            submissionCalendar
          }
        }
      }
    `;

    const badgeQuery = `
      query userBadges($username: String!) {
        matchedUser(username: $username) {
          badges {
            id
            displayName
            icon
            hoverText
          }
        }
      }
    `;

    const [profileRes, contestRes, submissionsRes, calendarRes, badgesRes] = await Promise.all([
      fetchGraphQL(profileAndSolvedQuery, { username }),
      fetchGraphQL(contestQuery, { username }),
      fetchGraphQL(submissionsQuery, { username, limit: 12 }),
      fetchGraphQL(calendarQuery, { username }),
      fetchGraphQL(badgeQuery, { username }),
    ]);

    const matchedUser = profileRes?.data?.matchedUser;
    
    if (!matchedUser) {
      return res.status(404).json({ error: "User not found or profile is completely private." });
    }

    const allQuestions = profileRes?.data?.allQuestionsCount || [];
    const submissionStats = matchedUser.submitStatsGlobal?.acSubmissionNum || [];
    const totalStats = matchedUser.submitStatsGlobal?.totalSubmissionNum || [];
    
    // Extract Solved and Totals
    const totalAll = allQuestions.find((q: any) => q.difficulty === "All")?.count || 3200;
    const totalEasy = allQuestions.find((q: any) => q.difficulty === "Easy")?.count || 800;
    const totalMedium = allQuestions.find((q: any) => q.difficulty === "Medium")?.count || 1600;
    const totalHard = allQuestions.find((q: any) => q.difficulty === "Hard")?.count || 800;

    const solvedAll = submissionStats.find((s: any) => s.difficulty === "All")?.count || 0;
    const solvedEasy = submissionStats.find((s: any) => s.difficulty === "Easy")?.count || 0;
    const solvedMedium = submissionStats.find((s: any) => s.difficulty === "Medium")?.count || 0;
    const solvedHard = submissionStats.find((s: any) => s.difficulty === "Hard")?.count || 0;

    // Calculate acceptance rate
    const acSubsAll = submissionStats.find((s: any) => s.difficulty === "All")?.submissions || 0;
    const totalSubsAll = totalStats.find((s: any) => s.difficulty === "All")?.submissions || 1;
    const acceptanceRate = totalSubsAll > 0 ? ((acSubsAll / totalSubsAll) * 100).toFixed(1) : "0.0";

    const ranking = matchedUser.profile?.ranking || 0;
    const realName = matchedUser.profile?.realName || "";
    const avatar = matchedUser.profile?.userAvatar || "";
    const reputation = matchedUser.profile?.reputation || 0;

    const contest = contestRes?.data?.userContestRanking || null;
    const recentSubmissions = submissionsRes?.data?.recentSubmissionList || [];
    const calendar = calendarRes?.data?.matchedUser?.userCalendar || null;
    const badges = badgesRes?.data?.matchedUser?.badges || [];

    // Parse the submissionCalendar JSON string
    let submissionCalendarParsed = {};
    if (calendar?.submissionCalendar) {
      try {
        submissionCalendarParsed = JSON.parse(calendar.submissionCalendar);
      } catch (e) {
        console.error("Error parsing submission calendar:", e);
      }
    }

    const compiledData = {
      username,
      realName,
      avatar,
      ranking,
      reputation,
      solved: {
        total: solvedAll,
        totalQuestions: totalAll,
        easy: solvedEasy,
        totalEasy,
        medium: solvedMedium,
        totalMedium,
        hard: solvedHard,
        totalHard,
        acceptanceRate: acceptanceRate + "%",
      },
      contest: contest ? {
        attendedCount: contest.attendedContestsCount || 0,
        rating: Math.round(contest.rating) || 0,
        globalRanking: contest.globalRanking || 0,
        totalParticipants: contest.totalParticipants || 0,
        topPercentage: contest.topPercentage || 0,
        badge: contest.badge?.name || ""
      } : null,
      recentSubmissions,
      calendar: calendar ? {
        activeYears: calendar.activeYears || [],
        streak: calendar.streak || 0,
        totalActiveDays: calendar.totalActiveDays || 0,
        submissionCalendar: submissionCalendarParsed
      } : {
        activeYears: [],
        streak: 0,
        totalActiveDays: 0,
        submissionCalendar: {}
      },
      badges: badges.map((b: any) => ({
        id: b.id,
        displayName: b.displayName,
        icon: b.icon.startsWith("http") ? b.icon : `https://leetcode.com${b.icon}`,
        hoverText: b.hoverText
      }))
    };

    if (username === "shiwanshu0711") {
      cacheData = compiledData;
      cacheTime = Date.now();
    }

    res.json(compiledData);
  } catch (error: any) {
    console.error("Error fetching LeetCode data:", error);
    res.status(500).json({ error: error.message || "Failed to fetch LeetCode data." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
