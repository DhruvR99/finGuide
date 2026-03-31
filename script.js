const assetLabels = [
  "Indian Stocks",
  "US Stocks",
  "Mutual Funds",
  "Gold",
  "Crypto",
  "Cash / FD",
];

const assetColors = [
  "#2E86DE",
  "#4BA3F0",
  "#2ECCB4",
  "#F4B740",
  "#A05AFC",
  "#8CA2B8",
];

const strategies = [
  {
    name: "Conservative",
    description: "Focuses on capital protection with limited volatility.",
    ideal: "Risk-averse investors and short-to-medium horizon goals",
    risk: "Low",
    allocation: [18, 8, 22, 15, 2, 35],
  },
  {
    name: "Balanced",
    description: "Mix of growth and stability for steady long-term progress.",
    ideal: "Investors seeking moderate growth with controlled risk",
    risk: "Moderate",
    allocation: [28, 12, 26, 10, 4, 20],
  },
  {
    name: "Aggressive Growth",
    description: "Prioritizes long-term growth and accepts high volatility.",
    ideal: "Young investors with long horizons and strong risk capacity",
    risk: "High",
    allocation: [38, 18, 20, 8, 8, 8],
  },
  {
    name: "Passive / Minimal Effort",
    description: "Simple diversified structure with low maintenance.",
    ideal: "Busy investors who prefer easy and disciplined investing",
    risk: "Moderate",
    allocation: [20, 15, 40, 10, 0, 15],
  },
  {
    name: "Barbell Strategy",
    description: "Combines high-growth assets with stable defensive assets.",
    ideal: "Investors who want upside and downside protection together",
    risk: "Moderate to High",
    allocation: [30, 15, 10, 10, 10, 25],
  },
];

const ageRecommendations = [
  {
    min: 18,
    max: 25,
    strategy: "Aggressive Growth or Aggressive Balanced",
    summary: "Higher growth focus is common at this stage with disciplined diversification.",
    allocation: {
      "Indian Stocks": 40,
      "US Stocks": 20,
      "Mutual Funds": 18,
      Gold: 7,
      Crypto: 7,
      "Cash / FD": 8,
    },
  },
  {
    min: 26,
    max: 35,
    strategy: "Balanced to Aggressive",
    summary: "Balanced-to-Aggressive allocation with growth focus and measured stability.",
    allocation: {
      "Indian Stocks": 35,
      "US Stocks": 15,
      "Mutual Funds": 25,
      Gold: 7,
      Crypto: 5,
      "Cash / FD": 13,
    },
  },
  {
    min: 36,
    max: 45,
    strategy: "Balanced",
    summary: "A balanced mix can support growth while gradually improving stability.",
    allocation: {
      "Indian Stocks": 28,
      "US Stocks": 12,
      "Mutual Funds": 30,
      Gold: 10,
      Crypto: 3,
      "Cash / FD": 17,
    },
  },
  {
    min: 46,
    max: 55,
    strategy: "Conservative Balanced",
    summary: "Capital protection and smoother returns become increasingly important.",
    allocation: {
      "Indian Stocks": 22,
      "US Stocks": 8,
      "Mutual Funds": 30,
      Gold: 12,
      Crypto: 1,
      "Cash / FD": 27,
    },
  },
  {
    min: 56,
    max: 100,
    strategy: "Conservative",
    summary: "Preservation and liquidity usually take priority over aggressive growth.",
    allocation: {
      "Indian Stocks": 14,
      "US Stocks": 5,
      "Mutual Funds": 28,
      Gold: 13,
      Crypto: 0,
      "Cash / FD": 40,
    },
  },
];

let budgetChart;
let recommendedChart;

function getAgeExampleContent(age) {
  if (age <= 25) {
    return {
      principle:
        "Prioritize compounding with disciplined diversification and enough liquidity for near-term needs.",
      points: [
        `At age ${age}, you usually have a long investment runway ahead.`,
        "You can often take higher equity exposure for long-term growth.",
        "Market volatility can be tolerated better with a long time horizon.",
        "Keep diversification and an emergency buffer to manage uncertainty.",
      ],
    };
  }

  if (age <= 35) {
    return {
      principle:
        "Balance growth with stability by combining equities, diversified funds, and a liquidity cushion.",
      points: [
        `At age ${age}, growth remains important while stability starts to matter more.`,
        "A balanced-to-aggressive mix can support wealth building over time.",
        "Volatility is manageable with disciplined investing and regular contributions.",
        "Diversification across domestic, global, and defensive assets remains key.",
      ],
    };
  }

  if (age <= 45) {
    return {
      principle:
        "Aim for steady compounding while gradually increasing allocation to lower-volatility assets.",
      points: [
        `At age ${age}, portfolio balance becomes increasingly important.`,
        "A moderate equity allocation can still drive growth for future goals.",
        "Risk control matters more as major responsibilities may increase.",
        "Maintain liquidity for planned expenses and unexpected events.",
      ],
    };
  }

  if (age <= 55) {
    return {
      principle:
        "Shift toward capital protection while preserving selective growth exposure.",
      points: [
        `At age ${age}, preserving accumulated wealth becomes a higher priority.`,
        "Balanced allocations often focus more on consistency than high growth.",
        "Lower portfolio volatility can reduce stress near late-career years.",
        "A stronger cash and defensive allocation can improve flexibility.",
      ],
    };
  }

  return {
    principle:
      "Focus on stability, liquidity, and capital preservation with carefully managed growth exposure.",
    points: [
      `At age ${age}, wealth preservation and predictable cash flow usually matter most.`,
      "Conservative allocations can help manage drawdown risk.",
      "Liquidity is important for healthcare and retirement spending needs.",
      "Diversification remains essential even in conservative portfolios.",
    ],
  };
}

function createDoughnutChart(canvasId, labels, values) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;

  return new Chart(canvas, {
    type: "doughnut",
    data: {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: assetColors,
          borderColor: "#ffffff",
          borderWidth: 2,
          hoverOffset: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 12,
            font: {
              family: "Manrope",
              size: 11,
            },
          },
        },
      },
      animation: {
        animateScale: true,
        duration: 750,
      },
    },
  });
}

function createStrategyCards() {
  const container = document.getElementById("strategyCards");
  if (!container) return;

  strategies.forEach((strategy, idx) => {
    const card = document.createElement("article");
    card.className = "strategy-card";
    const canvasId = `strategyChart${idx}`;
    const allocationList = assetLabels
      .map((label, i) => `<li>${label}: <strong>${strategy.allocation[i]}%</strong></li>`)
      .join("");

    card.innerHTML = `
      <h3>${strategy.name}</h3>
      <p>${strategy.description}</p>
      <div class="meta">
        <span class="tag">Ideal: ${strategy.ideal}</span>
        <span class="tag">Risk: ${strategy.risk}</span>
      </div>
      <ul class="list compact">${allocationList}</ul>
      <div class="chart-wrap">
        <canvas id="${canvasId}" aria-label="${strategy.name} allocation chart"></canvas>
      </div>
    `;

    container.appendChild(card);
    createDoughnutChart(canvasId, assetLabels, strategy.allocation);
  });
}

function renderRecommendedSection() {
  const ageInput = document.getElementById("ageInput");
  const titleEl = document.getElementById("recommendedTitle");
  const summaryEl = document.getElementById("recommendedSummary");
  const listEl = document.getElementById("recommendedList");
  const ageExampleTitle = document.getElementById("ageExampleTitle");
  const ageExampleList = document.getElementById("ageExampleList");
  const ageExamplePrinciple = document.getElementById("ageExamplePrinciple");
  const chartCanvas = document.getElementById("recommendedChart");
  if (
    !listEl ||
    !ageInput ||
    !titleEl ||
    !summaryEl ||
    !chartCanvas ||
    !ageExampleTitle ||
    !ageExampleList ||
    !ageExamplePrinciple
  ) {
    return;
  }

  const updateRecommendation = () => {
    const parsedAge = Number(ageInput.value);
    const age = Number.isFinite(parsedAge)
      ? Math.min(Math.max(parsedAge, 18), 100)
      : 26;

    if (String(age) !== ageInput.value) {
      ageInput.value = String(age);
    }

    const recommendation =
      ageRecommendations.find((band) => age >= band.min && age <= band.max) ||
      ageRecommendations[1];
    const exampleContent = getAgeExampleContent(age);
    const labels = Object.keys(recommendation.allocation);
    const values = Object.values(recommendation.allocation);

    titleEl.textContent = `Recommended for age ${age}`;
    summaryEl.textContent = `${recommendation.strategy}: ${recommendation.summary}`;
    ageExampleTitle.textContent = `Age ${age} Example: What It Often Means`;
    ageExamplePrinciple.textContent = exampleContent.principle;
    ageExampleList.innerHTML = exampleContent.points.map((point) => `<li>${point}</li>`).join("");

    listEl.innerHTML = labels
      .map((label, i) => `<li>${label}: <strong>${values[i]}%</strong></li>`)
      .join("");

    if (recommendedChart) {
      recommendedChart.destroy();
    }
    recommendedChart = createDoughnutChart("recommendedChart", labels, values);
  };

  ageInput.addEventListener("input", updateRecommendation);
  updateRecommendation();
}

function formatINR(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function buildBudgetChart(needs, wants, savings) {
  const ctx = document.getElementById("budgetChart");
  if (!ctx) return;

  if (budgetChart) {
    budgetChart.destroy();
  }

  budgetChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Needs (50%)", "Wants (30%)", "Savings / Investments (20%)"],
      datasets: [
        {
          data: [needs, wants, savings],
          backgroundColor: ["#2E86DE", "#2ECCB4", "#F4B740"],
          borderWidth: 2,
          borderColor: "#fff",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            font: {
              family: "Manrope",
              size: 12,
            },
          },
        },
      },
      animation: {
        duration: 600,
      },
    },
  });
}

function updatePlanner() {
  const salaryInput = document.getElementById("salary");
  const investInput = document.getElementById("investment");
  const benchmarkMessage = document.getElementById("benchmarkMessage");

  const salary = Math.max(Number(salaryInput.value) || 0, 0);
  const investment = Math.max(Number(investInput.value) || 0, 0);

  const needs = salary * 0.5;
  const wants = salary * 0.3;
  const savings = salary * 0.2;
  const investedPercent = salary > 0 ? (investment / salary) * 100 : 0;
  const remaining = salary - investment;

  document.getElementById("needsValue").textContent = formatINR(needs);
  document.getElementById("wantsValue").textContent = formatINR(wants);
  document.getElementById("savingsValue").textContent = formatINR(savings);
  document.getElementById("investPercent").textContent = `${investedPercent.toFixed(1)}%`;
  document.getElementById("remainingAmount").textContent = formatINR(Math.max(remaining, 0));

  if (investedPercent < 20) {
    benchmarkMessage.textContent =
      "You are currently below the 20% savings benchmark. If possible, try to gradually increase your monthly investment.";
    benchmarkMessage.className = "benchmark warn";
  } else {
    benchmarkMessage.textContent =
      "Great job. You are meeting or exceeding the 20% savings benchmark.";
    benchmarkMessage.className = "benchmark good";
  }

  buildBudgetChart(needs, wants, savings);
}

function initPlanner() {
  const salaryInput = document.getElementById("salary");
  const investInput = document.getElementById("investment");

  salaryInput.addEventListener("input", updatePlanner);
  investInput.addEventListener("input", updatePlanner);
  updatePlanner();
}

document.addEventListener("DOMContentLoaded", () => {
  createStrategyCards();
  renderRecommendedSection();
  initPlanner();
});
