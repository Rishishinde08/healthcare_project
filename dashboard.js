


    // Google Fit API configuration
    const CLIENT_ID = '799841388307-6kuel5gpvd4362k9rpblu14oj68s5246.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyBV5LKU1yxI0BPZfId1cTXbR5SCq-i66Q8';
    const SCOPES = 'https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/fitness.sleep.read';
    
    // DOM elements
    const connectBtn = document.getElementById('connect-btn');
    const authStatus = document.getElementById('auth-status');
    
    // Activity elements
    const stepsEl = document.getElementById('steps');
    const stepsProgress = document.getElementById('steps-progress');
    const stepsGoalEl = document.getElementById('steps-goal');
    const stepsPercentEl = document.getElementById('steps-percent');
    const distanceEl = document.getElementById('distance');
    const caloriesEl = document.getElementById('calories');
    
    // Heart elements
    const hrEl = document.getElementById('heart-rate');
    const restingHrEl = document.getElementById('resting-hr');
    const hrvEl = document.getElementById('hrv');
    const heartAlerts = document.getElementById('heart-alerts');
    
    // Sleep elements
    const sleepDurationEl = document.getElementById('sleep-duration');
    const sleepProgress = document.getElementById('sleep-progress');
    const sleepPercentEl = document.getElementById('sleep-percent');
    const sleepStages = document.getElementById('sleep-stages');
    
    // Date elements
    const activityDateEl = document.getElementById('activity-date');
    const heartDateEl = document.getElementById('heart-date');
    const sleepDateEl = document.getElementById('sleep-date');
    
    // Load the Google API client library
    function loadGoogleAPI() {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        gapi.load('client:auth2', initClient);
      };
      document.body.appendChild(script);
    }
    
    // Initialize the API client
    function initClient() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
        discoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/fitness/v1/rest'
        ]
      }).then(() => {
        // Listen for sign-in state changes
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        // Handle initial sign-in state
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      }).catch(error => {
        console.error('Error initializing Google API:', error);
        authStatus.innerHTML = `<div class="alert">Error initializing Google API: ${error.message}</div>`;
      });
    }
    
    // Update UI based on sign-in status
    function updateSigninStatus(isSignedIn) {
      if (isSignedIn) {
        connectBtn.innerHTML = '<i class="fas fa-check-circle"></i> Connected';
        connectBtn.style.background = 'var(--secondary)';
        authStatus.innerHTML = '';
        fetchFitnessData();
      } else {
        connectBtn.innerHTML = '<i class="fab fa-google"></i> Connect Google Fit';
        connectBtn.style.background = 'var(--primary)';
      }
    }
    
    // Handle sign-in
    function handleAuthClick() {
      if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
        gapi.auth2.getAuthInstance().signOut();
      } else {
        gapi.auth2.getAuthInstance().signIn();
      }
    }
    
    // Fetch all fitness data
    function fetchFitnessData() {
      updateDates();
      fetchStepsData();
      fetchHeartRateData();
      fetchSleepData();
    }
    
    // Update date displays
    function updateDates() {
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      activityDateEl.textContent = 'Today';
      heartDateEl.textContent = 'Today';
      sleepDateEl.textContent = yesterday.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
    
    // Fetch step count data
    function fetchStepsData() {
      const end = new Date();
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      
      gapi.client.fitness.users.dataset.aggregate({
        userId: 'me',
        requestBody: {
          aggregateBy: [{
            dataTypeName: 'com.google.step_count.delta',
            dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps'
          }],
          bucketByTime: { durationMillis: 86400000 }, // 1 day
          startTimeMillis: start.getTime(),
          endTimeMillis: end.getTime()
        }
      }).then(response => {
        const steps = response.result.bucket?.[0]?.dataset?.[0]?.point?.[0]?.value?.[0]?.intVal || 0;
        stepsEl.textContent = steps.toLocaleString();
        
        // Update progress (assuming 10,000 step goal)
        const goal = 10000;
        const percent = Math.min(Math.round((steps / goal) * 100), 100);
        stepsProgress.style.width = `${percent}%`;
        stepsPercentEl.textContent = `${percent}%`;
        
        if (steps >= goal) {
          stepsProgress.style.background = 'var(--secondary)';
        }
        
        // Also fetch distance and calories
        fetchDistanceAndCalories(start, end);
      }).catch(error => {
        console.error('Error fetching steps:', error);
        authStatus.innerHTML = `<div class="alert">Error fetching step data: ${error.message}</div>`;
      });
    }
    
    // Fetch distance and calories
    function fetchDistanceAndCalories(start, end) {
      // Distance in meters
      gapi.client.fitness.users.dataset.aggregate({
        userId: 'me',
        requestBody: {
          aggregateBy: [{
            dataTypeName: 'com.google.distance.delta',
            dataSourceId: 'derived:com.google.distance.delta:com.google.android.gms:merge_distance_delta'
          }],
          bucketByTime: { durationMillis: 86400000 },
          startTimeMillis: start.getTime(),
          endTimeMillis: end.getTime()
        }
      }).then(response => {
        const meters = response.result.bucket?.[0]?.dataset?.[0]?.point?.[0]?.value?.[0]?.fpVal || 0;
        distanceEl.textContent = (meters / 1000).toFixed(2);
      });
      
      // Calories in kcal
      gapi.client.fitness.users.dataset.aggregate({
        userId: 'me',
        requestBody: {
          aggregateBy: [{
            dataTypeName: 'com.google.calories.expended',
            dataSourceId: 'derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended'
          }],
          bucketByTime: { durationMillis: 86400000 },
          startTimeMillis: start.getTime(),
          endTimeMillis: end.getTime()
        }
      }).then(response => {
        const calories = response.result.bucket?.[0]?.dataset?.[0]?.point?.[0]?.value?.[0]?.fpVal || 0;
        caloriesEl.textContent = Math.round(calories);
      });
    }
    
    // Fetch heart rate data
    function fetchHeartRateData() {
      const end = new Date();
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      
      // Current heart rate (last reading)
      gapi.client.fitness.users.dataSources.get({
        userId: 'me',
        dataSourceId: 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm'
      }).then(response => {
        const dataSource = response.result;
        if (dataSource) {
          return gapi.client.fitness.users.dataPointChanges.list({
            userId: 'me',
            dataSourceId: dataSource.dataStreamId
          });
        }
      }).then(response => {
        const points = response?.result?.insertedDataPoint || [];
        if (points.length > 0) {
          const latest = points[points.length - 1];
          const bpm = latest.value[0].fpVal;
          hrEl.textContent = Math.round(bpm);
          
          // Check for abnormal heart rate
          if (bpm > 100) {
            heartAlerts.innerHTML = `
              <div class="alert">
                <i class="fas fa-exclamation-triangle"></i>
                Elevated heart rate (${Math.round(bpm)} bpm)
              </div>
            `;
          } else if (bpm < 50) {
            heartAlerts.innerHTML = `
              <div class="alert">
                <i class="fas fa-exclamation-triangle"></i>
                Low heart rate (${Math.round(bpm)} bpm)
              </div>
            `;
          }
        }
      }).catch(error => {
        console.error('Error fetching heart rate:', error);
      });
      
      // Resting heart rate (daily average)
      fetchRestingHeartRate(start, end);
    }
    
    // Fetch resting heart rate
    function fetchRestingHeartRate(start, end) {
      gapi.client.fitness.users.dataset.aggregate({
        userId: 'me',
        requestBody: {
          aggregateBy: [{
            dataTypeName: 'com.google.heart_rate.bpm',
            dataSourceId: 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm'
          }],
          bucketByTime: { durationMillis: 86400000 },
          startTimeMillis: start.getTime(),
          endTimeMillis: end.getTime()
        }
      }).then(response => {
        const bpm = response.result.bucket?.[0]?.dataset?.[0]?.point?.[0]?.value?.[0]?.fpVal || '--';
        restingHrEl.textContent = Math.round(bpm);
      });
    }
    
    // Fetch sleep data
    function fetchSleepData() {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 1);
      start.setHours(0, 0, 0, 0);
      
      gapi.client.fitness.users.sessions.list({
        userId: 'me',
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        activityType: 72 // Sleep
      }).then(response => {
        const sessions = response.result.session || [];
        if (sessions.length > 0) {
          const sleepSession = sessions[0];
          const startTime = new Date(sleepSession.startTimeMillis);
          const endTime = new Date(sleepSession.endTimeMillis);
          const durationHours = (endTime - startTime) / (1000 * 60 * 60);
          
          sleepDurationEl.textContent = durationHours.toFixed(1);
          
          // Update sleep progress (assuming 8 hour goal)
          const sleepPercent = Math.min(Math.round((durationHours / 8) * 100), 100);
          sleepProgress.style.width = `${sleepPercent}%`;
          sleepPercentEl.textContent = `${sleepPercent}%`;
          
          // Fetch sleep stages if available
          fetchSleepStages(startTime, endTime);
        }
      }).catch(error => {
        console.error('Error fetching sleep data:', error);
      });
    }
    
    // Fetch sleep stages (if available)
    function fetchSleepStages(startTime, endTime) {
      gapi.client.fitness.users.dataSources.get({
        userId: 'me',
        dataSourceId: 'derived:com.google.sleep.segment:com.google.android.gms:merged'
      }).then(response => {
        const dataSource = response.result;
        if (dataSource) {
          return gapi.client.fitness.users.dataset.aggregate({
            userId: 'me',
            requestBody: {
              aggregateBy: [{
                dataTypeName: 'com.google.sleep.segment',
                dataSourceId: dataSource.dataStreamId
              }],
              bucketByTime: { durationMillis: endTime - startTime },
              startTimeMillis: startTime.getTime(),
              endTimeMillis: endTime.getTime()
            }
          });
        }
      }).then(response => {
        const buckets = response?.result?.bucket || [];
        if (buckets.length > 0) {
          const stages = buckets[0].dataset[0].point || [];
          displaySleepStages(stages);
        }
      }).catch(error => {
        console.error('Error fetching sleep stages:', error);
      });
    }
    
    // Display sleep stages
    function displaySleepStages(stages) {
      let html = '<div style="margin-top: 15px;"><strong>Sleep Stages:</strong></div>';
      let totalSleepTime = 0;
      let stageTimes = {
        awake: 0,
        light: 0,
        deep: 0,
        rem: 0
      };
      
      stages.forEach(stage => {
        const stageType = stage.value[0].intVal;
        const duration = (stage.endTimeNanos - stage.startTimeNanos) / (1000000000 * 60); // in minutes
        
        switch(stageType) {
          case 1: // Awake
            stageTimes.awake += duration;
            break;
          case 2: // Light
            stageTimes.light += duration;
            totalSleepTime += duration;
            break;
          case 3: // Deep
            stageTimes.deep += duration;
            totalSleepTime += duration;
            break;
          case 4: // REM
            stageTimes.rem += duration;
            totalSleepTime += duration;
            break;
        }
      });
      
      if (totalSleepTime > 0) {
        html += `
          <div style="margin-top: 10px;">
            <div>Light: ${(stageTimes.light / 60).toFixed(1)}h (${Math.round((stageTimes.light / totalSleepTime) * 100)}%)</div>
            <div>Deep: ${(stageTimes.deep / 60).toFixed(1)}h (${Math.round((stageTimes.deep / totalSleepTime) * 100)}%)</div>
            <div>REM: ${(stageTimes.rem / 60).toFixed(1)}h (${Math.round((stageTimes.rem / totalSleepTime) * 100)}%)</div>
            <div>Awake: ${(stageTimes.awake / 60).toFixed(1)}h</div>
          </div>
        `;
      }
      
      sleepStages.innerHTML = html;
    }
    
    // Initialize
    window.addEventListener('load', () => {
      loadGoogleAPI();
      connectBtn.addEventListener('click', handleAuthClick);
    });
 