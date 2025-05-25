// reminder.js - Complete Fixed Version
let reminders = [
    {
        id: 1,
        title: "Morning Routine",
        time: "01:06",
        duration: 5,
        steps: [
            "Take blood pressure medication with water",
            "Check and record morning blood sugar",
            "Apply any morning topical medications",
            "Take vitamin supplements with breakfast"
        ],
        active: false,
        startedAt: null,
        timer: null,
        cancelled: false
    },
    {
        id: 2,
        title: "Midday Check-In",
        time: "12:30",
        duration: 5,
        steps: [
            "Wash hands before handling medications",
            "Take prescribed midday medications",
            "Do quick posture check and stretch",
            "Drink full glass of water with meds"
        ],
        active: false,
        startedAt: null,
        timer: null,
        cancelled: false
    },
    {
        id: 3,
        title: "Evening Medications",
        time: "18:07",
        duration: 5,
        steps: [
            "Prepare all evening medications",
            "Take with food or as directed",
            "Record any side effects noticed",
            "Set up morning medications for tomorrow"
        ],
        active: false,
        startedAt: null,
        timer: null,
        cancelled: false
    },
    {
        id: 4,
        title: "Bedtime Routine",
        time: "23:27",
        duration: 5,
        steps: [
            "Take nighttime medications as prescribed",
            "Apply any nighttime creams or treatments",
            "Prepare CPAP machine if needed",
            "Practice 2 minutes of deep breathing"
        ],
        active: false,
        startedAt: null,
        timer: null,
        cancelled: false
    }
];

// DOM Elements
const reminderGrid = document.getElementById('reminderGrid');
const addReminderBtn = document.getElementById('addReminderBtn');
const addReminderForm = document.getElementById('addReminderForm');
const saveReminderBtn = document.getElementById('saveReminderBtn');
const cancelReminderBtn = document.getElementById('cancelReminderBtn');
const addStepBtn = document.getElementById('addStepBtn');
const stepInputs = document.getElementById('stepInputs');
const notification = document.getElementById('notification');

// Global Variables
let activeReminder = null;
let currentStepIndex = 0;
let timeLeft = 0;

// Initialize the application
function init() {
    renderReminders();
    setupEventListeners();
    setInterval(checkScheduledReminders, 1000);
}

// Render all reminders
function renderReminders() {
    reminderGrid.innerHTML = '';

    reminders.forEach(reminder => {
        const reminderCard = document.createElement('div');
        reminderCard.className = `reminder-card ${reminder.active ? 'active-reminder' : ''}`;
        reminderCard.dataset.id = reminder.id;

        const timePerStep = Math.floor((reminder.duration * 60) / reminder.steps.length);

        reminderCard.innerHTML = `
            <div class="reminder-header">
                <h3 class="reminder-title">${reminder.title}</h3>
                <span class="reminder-time">${reminder.time}</span>
            </div>
            <div class="reminder-details">
                <span class="reminder-duration">${reminder.duration} minutes total</span>
                <p>${reminder.steps.length} steps (${Math.floor(timePerStep/60)}:${(timePerStep%60).toString().padStart(2, '0')} per step)</p>
            </div>
            ${reminder.active ? `
                <div class="timer-container">
                    <div class="timer" id="timer-${reminder.id}">${formatTime(timeLeft)}</div>
                </div>
                <div class="current-step">
                    <h4 class="current-step-title">Current Step: ${currentStepIndex + 1}/${reminder.steps.length}</h4>
                    <p>${reminder.steps[currentStepIndex]}</p>
                </div>
            ` : `
                <div class="reminder-steps">
                    <h4>Steps:</h4>
                    ${reminder.steps.map(step => `<p class="step">${step}</p>`).join('')}
                </div>
            `}
            <div class="action-buttons">
                ${reminder.active ? `
                    <button class="btn btn-success complete-btn">Complete Step</button>
                    <button class="btn btn-danger cancel-btn">Cancel Reminder</button>
                ` : `
                    <button class="btn btn-primary start-btn">Start Now</button>
                    <button class="btn btn-danger delete-btn">Delete</button>
                `}
            </div>
        `;

        reminderGrid.appendChild(reminderCard);
    });

    // Add event listeners to buttons
    document.querySelectorAll('.start-btn').forEach(btn => btn.addEventListener('click', startReminder));
    document.querySelectorAll('.complete-btn').forEach(btn => btn.addEventListener('click', completeStep));
    document.querySelectorAll('.cancel-btn').forEach(btn => btn.addEventListener('click', cancelReminder));
    document.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener('click', deleteReminder));
}

// Set up event listeners
function setupEventListeners() {
    addReminderBtn.addEventListener('click', () => {
        addReminderForm.style.display = 'block';
        addReminderBtn.style.display = 'none';
    });

    cancelReminderBtn.addEventListener('click', () => {
        addReminderForm.style.display = 'none';
        addReminderBtn.style.display = 'block';
        resetForm();
    });

    addStepBtn.addEventListener('click', addStepInput);
    saveReminderBtn.addEventListener('click', saveReminder);
}

// Add step input field
function addStepInput() {
    const stepInput = document.createElement('div');
    stepInput.className = 'step-input';
    stepInput.innerHTML = `
        <input type="text" class="form-control step-input-field" placeholder="Step instruction">
        <button type="button" class="remove-step-btn">×</button>
    `;
    stepInputs.appendChild(stepInput);

    stepInput.querySelector('.remove-step-btn').addEventListener('click', () => {
        stepInputs.removeChild(stepInput);
    });
}

// Save new reminder
function saveReminder() {
    const title = document.getElementById('reminderTitle').value.trim();
    const time = document.getElementById('reminderTime').value;
    const duration = parseInt(document.getElementById('reminderDuration').value);
    const steps = Array.from(document.querySelectorAll('.step-input-field')).map(input => input.value.trim()).filter(step => step);

    if (!title || !time || steps.length === 0) {
        showNotification('Please fill in all fields');
        return;
    }

    reminders.push({
        id: Date.now(),
        title,
        time,
        duration,
        steps,
        active: false,
        startedAt: null,
        timer: null,
        cancelled: false
    });

    renderReminders();
    addReminderForm.style.display = 'none';
    addReminderBtn.style.display = 'block';
    resetForm();
    showNotification('Reminder added successfully!');
}

// Reset form fields
function resetForm() {
    document.getElementById('reminderTitle').value = '';
    document.getElementById('reminderTime').value = '';
    document.getElementById('reminderDuration').value = '5';
    stepInputs.innerHTML = `
        <div class="step-input">
            <input type="text" class="form-control step-input-field" placeholder="Step instruction">
        </div>
    `;
}

// Start a reminder
function startReminder(e) {
    const reminderCard = e.target.closest('.reminder-card');
    const reminderId = parseInt(reminderCard.dataset.id);
    const reminder = reminders.find(r => r.id === reminderId);

    // Don't start if cancelled
    if (reminder.cancelled) return;

    // Cancel any active reminder first
    if (activeReminder) {
        cancelReminder();
    }

    activeReminder = reminder;
    currentStepIndex = 0;
    const timePerStep = Math.floor((activeReminder.duration * 60) / activeReminder.steps.length);
    timeLeft = timePerStep;
    
    // Record start time
    activeReminder.startedAt = new Date();

    // Activate this reminder
    reminders = reminders.map(r => ({
        ...r,
        active: r.id === reminderId
    }));

    // Start timer and store reference
    activeReminder.timer = setInterval(updateTimer, 1000);
    renderReminders();

    // Show notifications
    showNotification(`Started: ${activeReminder.title}`);
    sendSystemNotification(`Healthcare Reminder: ${activeReminder.title}`, `Step 1: ${activeReminder.steps[0]}`);
}

// Update timer countdown
function updateTimer() {
    if (!activeReminder) return;
    
    timeLeft--;

    // Update timer display
    const timerElement = document.getElementById(`timer-${activeReminder.id}`);
    if (timerElement) {
        timerElement.textContent = formatTime(timeLeft);
    }

    // Move to next step or complete
    if (timeLeft <= 0) {
        if (currentStepIndex < activeReminder.steps.length - 1) {
            // Next step
            currentStepIndex++;
            timeLeft = Math.floor((activeReminder.duration * 60) / activeReminder.steps.length);
            renderReminders();
            sendSystemNotification(`Next Step: ${activeReminder.title}`, `Step ${currentStepIndex + 1}: ${activeReminder.steps[currentStepIndex]}`);
        } else {
            // All steps complete
            completeReminder();
        }
    }
}

// Complete current step
function completeStep() {
    if (!activeReminder) return;
    
    if (currentStepIndex < activeReminder.steps.length - 1) {
        currentStepIndex++;
        timeLeft = Math.floor((activeReminder.duration * 60) / activeReminder.steps.length);
        renderReminders();
        showNotification(`Moved to step ${currentStepIndex + 1}`);
    } else {
        completeReminder();
    }
}

// Complete the entire reminder
function completeReminder() {
    if (!activeReminder) return;
    
    // Clear the timer
    if (activeReminder.timer) {
        clearInterval(activeReminder.timer);
        activeReminder.timer = null;
    }

    // Update state
    reminders = reminders.map(r => ({
        ...r,
        active: false,
        startedAt: null,
        timer: null,
        cancelled: false
    }));
    
    activeReminder = null;
    currentStepIndex = 0;
    timeLeft = 0;
    
    renderReminders();
    showNotification('Reminder completed successfully!');
}

// Cancel and stop the current reminder
function cancelReminder() {
    if (!activeReminder) return;
    
    // Mark as cancelled
    activeReminder.cancelled = true;
    
    // Clear the timer
    if (activeReminder.timer) {
        clearInterval(activeReminder.timer);
        activeReminder.timer = null;
    }

    // Update state
    reminders = reminders.map(r => ({
        ...r,
        active: false,
        startedAt: null,
        timer: null,
        cancelled: r.id === activeReminder.id ? true : r.cancelled
    }));
    
    // Reset global variables
    const cancelledId = activeReminder.id;
    activeReminder = null;
    currentStepIndex = 0;
    timeLeft = 0;
    
    renderReminders();
    showNotification('Reminder cancelled');
    sendSystemNotification('Reminder Stopped', 'The reminder was cancelled');

    // Prevent immediate restart
    setTimeout(() => {
        reminders = reminders.map(r => 
            r.id === cancelledId ? {...r, cancelled: false} : r
        );
    }, 60000); // 1 minute cooldown
}

// Delete a reminder
function deleteReminder(e) {
    const reminderCard = e.target.closest('.reminder-card');
    const reminderId = parseInt(reminderCard.dataset.id);

    // If deleting the active reminder, cancel it first
    if (activeReminder && activeReminder.id === reminderId) {
        cancelReminder();
    }

    // Remove from array
    reminders = reminders.filter(r => r.id !== reminderId);
    renderReminders();
    showNotification('Reminder deleted');
}

// Check and start reminders at their scheduled time
function checkScheduledReminders() {
    const currentTime = getCurrentTimeString();
    const now = new Date();
    
    // Skip if any reminder is active or recently cancelled
    if (activeReminder || reminders.some(r => r.cancelled)) {
        return;
    }
    
    // Find and start eligible reminders
    reminders.forEach(reminder => {
        if (reminder.time === currentTime && !reminder.active && !reminder.cancelled) {
            const fakeEvent = {
                target: {
                    closest: () => document.querySelector(`.reminder-card[data-id="${reminder.id}"]`)
                }
            };
            startReminder(fakeEvent);
        }
    });
}

// Helper Functions

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function getCurrentTimeString() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 3000);
}

function sendSystemNotification(title, body) {
    if (Notification.permission === 'granted') {
        new Notification(title, {
            body: body,
            icon: '/info/assets/ADHD in children.jpg'
        });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission();
    }
}

// Initialize the application
init();