window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('hidden');

    // --- GLOBAL STATE & DATA ---
    let currentLocation = "Nagpur, India";

    const commodityList = [
        "Corn", "Soybeans", "Wheat", "Rice", "Cotton", "Sugar", "Coffee", "Cocoa", "Canola", "Oats",
        "Crude Oil", "Natural Gas", "Gold", "Silver", "Copper", "Lumber", "Lean Hogs", "Live Cattle"
    ];

    // --- MOCK DATA ---
    const mockClimateData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        temp: [22, 24, 28, 32, 35, 31, 29, 29, 28, 27, 25, 23],
        rainfall: [30, 25, 15, 5, 10, 150, 300, 280, 180, 80, 40, 20],
        soil: [0.6, 0.55, 0.4, 0.25, 0.2, 0.7, 0.9, 0.85, 0.75, 0.6, 0.5, 0.45]
    };
    const mockMarketData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        prices: {
            "Wheat": [280, 285, 290, 300, 310, 305], "Corn": [220, 225, 215, 230, 240, 235],
            "Soybeans": [450, 460, 455, 470, 480, 475], "Rice": [500, 510, 505, 520, 525, 515],
            "Cotton": [85, 88, 92, 90, 95, 93], "Crude Oil": [70, 72, 75, 80, 78, 82]
        }
    };

    // --- DOM ELEMENTS ---
    const navLinks = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    const locationModal = document.getElementById('location-modal');
    const locationDisplayWrapper = document.getElementById('location-display-wrapper');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const manualLocationInput = document.getElementById('manual-location-input');
    const updateLocationBtn = document.getElementById('update-location-btn');
    const dashboardLocationEl = document.getElementById('dashboard-location');
    const aiLocationInput = document.getElementById('location-input');
    const locationHighlightEls = document.querySelectorAll('.location-highlight');
    const recommenderForm = document.getElementById('recommender-form-element');

    // --- INITIALIZATION ---
    function init() {
        setupEventListeners();
        updateLocationUI();
        navigateToPage('dashboard');
    }

    function setupEventListeners() {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navigateToPage(link.dataset.page);
            });
        });

        locationDisplayWrapper.addEventListener('click', openLocationModal);
        modalCloseBtn.addEventListener('click', closeLocationModal);
        locationModal.addEventListener('click', (e) => e.target === locationModal && closeLocationModal());
        
        updateLocationBtn.addEventListener('click', handleLocationUpdate);
        
        recommenderForm.addEventListener('submit', handleRecommendationSubmit);

        const commoditySearch = document.getElementById('commodity-search');
        const commodityDropdown = document.getElementById('commodity-dropdown');
        commoditySearch.addEventListener('focus', () => filterCommodities(''));
        commoditySearch.addEventListener('keyup', () => filterCommodities(commoditySearch.value));
        document.addEventListener('click', (e) => {
            if (!document.querySelector('.market-controls').contains(e.target)) {
                commodityDropdown.style.display = 'none';
            }
        });
    }

    // --- UI & PAGE LOGIC ---
    function navigateToPage(pageId) {
        navLinks.forEach(link => link.classList.toggle('active', link.dataset.page === pageId));
        pages.forEach(page => page.classList.toggle('active', page.id === pageId));
        
        switch(pageId) {
            case 'dashboard': renderDashboard(); break;
            case 'insights': renderInsights(); break;
            case 'climate': initClimateCharts(); break;
            case 'market': initMarketChart("Wheat"); filterCommodities(''); break;
        }
    }
    
    function updateLocationUI() {
        dashboardLocationEl.textContent = currentLocation;
        aiLocationInput.value = currentLocation;
        locationHighlightEls.forEach(el => el.textContent = currentLocation);
    }

    // --- LOCATION MODAL ---
    function openLocationModal() {
        manualLocationInput.value = currentLocation;
        locationModal.classList.add('visible');
    }

    function closeLocationModal() {
        locationModal.classList.remove('visible');
    }

    function handleLocationUpdate() {
        const newLocation = manualLocationInput.value.trim();
        if (newLocation) {
            currentLocation = newLocation;
            updateLocationUI();
            closeLocationModal();
            const activePage = document.querySelector('.page.active').id;
            navigateToPage(activePage);
        }
    }

    // --- DYNAMIC RENDERING ---
    function renderDashboard() {
        const grid = document.getElementById('dashboard-grid');
        grid.innerHTML = `
            <div class="card stat-card" style="animation-delay: 0.1s;">
                <h3>Temperature</h3><p class="value">35<span class="unit">°C</span></p><p class="details">Feels like 38°C</p>
            </div>
            <div class="card stat-card" style="animation-delay: 0.2s;">
                <h3>Soil Moisture</h3><p class="value">20<span class="unit">%</span></p><p class="details">Critically low</p>
            </div>
            <div class="card drought-card high-risk" style="animation-delay: 0.3s;">
                <div><h3>Drought Risk</h3><p class="risk-level" style="color: var(--accent-red);">High</p></div>
            </div>
            <div class="card forecast-card" style="animation-delay: 0.4s;">
                <h3>7-Day Forecast</h3>
                <div class="day"><span>Today</span><span>35°/22° Sunny</span></div>
                <div class="day"><span>Tomorrow</span><span>36°/23° Sunny</span></div>
                <div class="day"><span>Wed</span><span>37°/24° Hazy Sun</span></div>
            </div>
            <div class="card actions-card" style="animation-delay: 0.5s;">
                <h3>Quick Actions</h3>
                <div class="action-buttons">
                    <button class="action-btn">Log Irrigation</button>
                    <button class="action-btn">View Pest Report</button>
                </div>
            </div>
        `;
    }

    function renderInsights() {
        const insights = [
            { title: "Pest & Disease Alert", value: "Moderate Risk: Aphids", details: "Recent temperature shifts are favorable for aphid populations. Scout fields, especially new growth. Consider preventative neem oil spray.", color: "var(--accent-yellow)" },
            { title: "Irrigation Advisory", value: "Irrigate within 48 hours", details: "Soil moisture is dropping below the optimal threshold. Apply 1.5 inches of water to restore root zone moisture. No significant rain forecasted.", color: "var(--glow-1)" },
            { title: "Fertilizer Timing", value: "Optimal Window: Next 3-5 Days", details: "The crop is entering a key growth stage. Applying nitrogen fertilizer now will maximize uptake and boost yield potential.", color: "var(--accent-green)" },
            { title: "Nutrient Deficiency Watch", value: "Potential Nitrogen Stress", details: "Satellite data suggests early signs of yellowing in lower leaves. Consider a tissue sample to confirm before top-dressing.", color: "var(--accent-yellow)" },
            { title: "Market Opportunity", value: "Soybean Prices Trending Up", details: "Global demand is increasing. Consider selling a portion of your stored harvest if prices exceed your target.", color: "var(--accent-green)" }
        ];
        const grid = document.getElementById('insights-grid');
        grid.innerHTML = insights.map((insight, i) => `
            <div class="card insight-card" style="animation-delay: ${i * 0.1}s;">
                <h4>${insight.title}</h4>
                <p class="value" style="color: ${insight.color};">${insight.value}</p>
                <p class="details">${insight.details}</p>
            </div>
        `).join('');
    }

    // --- AI RECOMMENDATION ---
    async function handleRecommendationSubmit(e) {
        e.preventDefault();
        const generateBtn = document.getElementById('generate-btn');
        const resultContainer = document.getElementById('recommendation-result');
        const btnLoader = document.getElementById('btn-loader');
        const btnIcon = document.getElementById('btn-icon');
        const btnText = document.getElementById('btn-text');

        generateBtn.disabled = true;
        btnLoader.style.display = 'block';
        btnIcon.style.display = 'none';
        btnText.textContent = 'Analyzing...';
        resultContainer.innerHTML = '';

        const prompt = `
            For an agricultural user in ${currentLocation}, provide a detailed crop recommendation.
            Current conditions: Moderately high temperature, low recent rainfall, decreasing soil moisture.
            Forecast: Hot and dry for the next 15 days.
            Analyze these factors and provide a structured JSON response with the following fields: cropName, reasoning, soilPreparation, waterManagement, potentialRisks.
        `;

        try {
            const payload = {
                contents: [{ role: "user", parts: [{ text: prompt }] }],
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: "OBJECT",
                        properties: {
                            cropName: { type: "STRING" },
                            reasoning: { type: "STRING" },
                            soilPreparation: { type: "STRING" },
                            waterManagement: { type: "STRING" },
                            potentialRisks: { type: "STRING" }
                        },
                        required: ["cropName", "reasoning", "soilPreparation", "waterManagement", "potentialRisks"]
                    }
                }
            };
            const apiKey = ""; // Leave empty
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
            
            const result = await response.json();
            const recommendation = JSON.parse(result.candidates[0].content.parts[0].text);
            displayRecommendation(recommendation);

        } catch (err) {
            console.error(err);
            const fallback = {
                cropName: "Millet (Bajra)",
                reasoning: "Extremely drought-resistant and heat-tolerant, making it a low-risk choice for the current forecast. It has minimal water requirements and can thrive in arid conditions.",
                soilPreparation: "Requires a well-pulverized but compact seedbed. Minimal tillage is sufficient. Ensure the field is free of weeds before sowing.",
                waterManagement: "Primarily rain-fed. If irrigating, apply light watering at critical stages like tillering and grain filling. Avoid waterlogging.",
                potentialRisks: "Susceptible to downy mildew in humid conditions (low risk in current forecast) and bird damage during grain maturity. Monitor for stem borers."
            };
            displayRecommendation(fallback, true);
        } finally {
            generateBtn.disabled = false;
            btnLoader.style.display = 'none';
            btnIcon.style.display = 'block';
            btnText.textContent = 'Generate';
        }
    }

    function displayRecommendation(data, isError = false) {
        const resultContainer = document.getElementById('recommendation-result');
        const errorMsg = isError ? `<p style="color: var(--accent-red); margin-bottom: 1rem;">An error occurred. Showing a fallback recommendation.</p>` : '';
        resultContainer.innerHTML = `
            <div class="card result-card" style="animation: fadeIn 0.5s ease-out;">
                ${errorMsg}
                <h3 class="result-header">Recommended Crop: <span>${data.cropName}</span></h3>
                <p class="details" style="margin-bottom: 1.5rem;">${data.reasoning}</p>
                <div class="recommendation-details">
                    <div class="detail-section"><h4>Soil Preparation</h4><p>${data.soilPreparation}</p></div>
                    <div class="detail-section"><h4>Water Management</h4><p>${data.waterManagement}</p></div>
                    <div class="detail-section"><h4>Potential Risks</h4><p>${data.potentialRisks}</p></div>
                </div>
            </div>
        `;
    }

    // --- CHART.JS LOGIC ---
    let climateChartInstance, soilChartInstance, marketChartInstance;

    function initClimateCharts() {
        if (climateChartInstance) climateChartInstance.destroy();
        climateChartInstance = new Chart(document.getElementById('climateChart'), {
            type: 'line', data: { labels: mockClimateData.labels, datasets: [ { label: 'Temp (°C)', data: mockClimateData.temp, borderColor: '#FFA726', yAxisID: 'y', tension: 0.4 }, { label: 'Rainfall (mm)', data: mockClimateData.rainfall, borderColor: '#42A5F5', yAxisID: 'y1', tension: 0.4 } ] },
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { position: 'left' }, y1: { position: 'right', grid: { drawOnChartArea: false } } } }
        });
        if (soilChartInstance) soilChartInstance.destroy();
        soilChartInstance = new Chart(document.getElementById('soilChart'), {
            type: 'bar', data: { labels: mockClimateData.labels, datasets: [{ label: 'Soil Moisture', data: mockClimateData.soil, backgroundColor: '#26C6DA' }] },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    function initMarketChart(commodity) {
        if (marketChartInstance) marketChartInstance.destroy();
        const prices = mockMarketData.prices[commodity] || mockMarketData.prices["Wheat"];
        marketChartInstance = new Chart(document.getElementById('marketChart'), {
            type: 'line',
            data: { labels: mockMarketData.labels, datasets: [{ label: `${commodity} Price (USD)`, data: prices, borderColor: 'var(--glow-1)', backgroundColor: 'rgba(34, 211, 238, 0.1)', fill: true, tension: 0.4 }] },
            options: { responsive: true, maintainAspectRatio: false }
        });
        updateMarketSnapshot(prices);
    }

    function updateMarketSnapshot(prices) {
        const snapshotEl = document.getElementById('market-snapshot');
        const high = Math.max(...prices);
        const low = Math.min(...prices);
        const sentiment = prices[prices.length - 1] > prices[0] ? 'Bullish' : 'Bearish';
        snapshotEl.innerHTML = `
            <div class="snapshot-item"><h5>52-Wk High</h5><p>${high}</p></div>
            <div class="snapshot-item"><h5>52-Wk Low</h5><p>${low}</p></div>
            <div class="snapshot-item"><h5>Sentiment</h5><p class="${sentiment.toLowerCase()}">${sentiment}</p></div>
        `;
    }

    function filterCommodities(searchTerm) {
        const dropdown = document.getElementById('commodity-dropdown');
        dropdown.innerHTML = '';
        const filtered = commodityList.filter(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
        
        if (filtered.length > 0) {
            filtered.forEach(c => {
                const item = document.createElement('div');
                item.className = 'commodity-dropdown-item';
                item.textContent = c;
                item.addEventListener('click', () => {
                    document.getElementById('commodity-search').value = c;
                    initMarketChart(c);
                    dropdown.style.display = 'none';
                });
                dropdown.appendChild(item);
            });
            dropdown.style.display = 'block';
        } else {
            dropdown.style.display = 'none';
        }
    }
    
    // --- START THE APP ---
    init();
});
