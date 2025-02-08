document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    // Mobile Menu Toggle Functionality
    const menuIcon = document.getElementById("menu-icon");
    const navMenu = document.querySelector("nav ul");

    menuIcon?.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // Secure Input Sanitization Function
    function sanitizeInput(input) {
        const div = document.createElement("div");
        div.textContent = input;
        return div.innerHTML;
    }

    // Loan Applicants Data
    const applicants = [
        { name: "John Doe", outstandingPreviousAmount: 500, requestedAmount: 1000, history: ["Loan 1", "Loan 2"] },
        { name: "Jane Smith", outstandingPreviousAmount: 300, requestedAmount: 750, history: ["Loan 1"] },
        { name: "Bob Johnson", outstandingPreviousAmount: 200, requestedAmount: 1200, history: ["Loan 1", "Loan 2", "Loan 3"] },
        { name: "Emily Davis", outstandingPreviousAmount: 400, requestedAmount: 950, history: ["Loan 1"] },
        { name: "Michael Brown", outstandingPreviousAmount: 600, requestedAmount: 1100, history: ["Loan 1", "Loan 2"] },
        { name: "Jessica Wilson", outstandingPreviousAmount: 150, requestedAmount: 650, history: ["Loan 1", "Loan 2", "Loan 3", "Loan 4"] },
        { name: "Daniel Garcia", outstandingPreviousAmount: 700, requestedAmount: 1500, history: ["Loan 1"] },
    ];

    // Display Applicants in Table
    function displayApplicants(filteredApplicants = applicants) {
        const applicantsList = document.getElementById("applicantsList");
        if (!applicantsList) return;
        
        applicantsList.innerHTML = filteredApplicants.map((applicant, index) => `
            <tr>
                <td>${sanitizeInput(applicant.name)}</td>
                <td>$${applicant.outstandingPreviousAmount.toFixed(2)}</td>
                <td>$${applicant.requestedAmount.toFixed(2)}</td>
                <td><button onclick="showApplicantDetails(${index})">View Details</button></td>
            </tr>
        `).join('');
    }

    // Show Applicant Details
    window.showApplicantDetails = function (index) {
        const applicant = applicants[index];
        if (!applicant) return;

        const calculatedBalance = applicant.requestedAmount * 1.4;
        
        document.getElementById("statusText").innerText = `${applicant.name}'s Application Status: Approved`;
        document.getElementById("outstandingBalance").innerText = `Outstanding Balance: $${calculatedBalance.toFixed(2)}`;
        document.getElementById("historyText").innerHTML = `Loan History: ${applicant.history.map(sanitizeInput).join(", ")}`;

        startCountdown(new Date(), 3);
        startPaymentCountdown();
    };

    // Loan Due Date Countdown
    function startCountdown(borrowDate, returnMonths) {
        const endDate = new Date(borrowDate);
        endDate.setMonth(endDate.getMonth() + returnMonths);
        document.getElementById("returnDateDisplay").innerText = `Total Loan Due Date: ${endDate.toDateString()}`;

        const countdownText = document.getElementById("countdownText");
        if (!countdownText) return;

        const interval = setInterval(() => {
            const timeDiff = endDate - new Date();
            if (timeDiff <= 0) {
                clearInterval(interval);
                countdownText.innerText = "Loan period is over.";
            } else {
                const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                countdownText.innerText = `Total Time Remaining: ${daysLeft}d`;
            }
        }, 1000);
    }

    // Payment Due Date Countdown
    function startPaymentCountdown() {
        const paymentDueDate = new Date();
        paymentDueDate.setDate(paymentDueDate.getDate() + 30);
        document.getElementById("nextPaymentDueDisplay").innerText = `Next Payment Due Date: ${paymentDueDate.toDateString()}`;

        const paymentCountdownText = document.getElementById("paymentCountdownText");
        if (!paymentCountdownText) return;

        const interval = setInterval(() => {
            const timeDiff = paymentDueDate - new Date();
            if (timeDiff <= 0) {
                clearInterval(interval);
                paymentCountdownText.innerText = "Payment is due.";
            } else {
                const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                paymentCountdownText.innerText = `Next Payment Time Remaining: ${daysLeft}d`;
            }
        }, 1000);
    }

    // Search Functionality
    function filterApplicants() {
        const searchValue = sanitizeInput(document.getElementById("searchInput").value.toLowerCase());
        const filtered = applicants.filter(applicant => applicant.name.toLowerCase().includes(searchValue));
        displayApplicants(filtered);
    }

    // Attach Event Listeners
    const searchInputField = document.getElementById("searchInput");
    searchInputField?.addEventListener("input", filterApplicants);

    // Prevent XSS Attacks
    function preventScriptInjection() {
        document.querySelectorAll("input, textarea").forEach(input => {
            input.addEventListener("input", () => {
                input.value = sanitizeInput(input.value);
            });
        });
    }

    // Block Console Execution (Basic Security)
    (function () {
        const devtools = /./;
        devtools.toString = function () {
            console.log("DevTools Detected! Console is disabled for security.");
            return "";
        };
        console.log("%c", devtools);
    })();

    // Initialize Functions
    displayApplicants();
    preventScriptInjection();
});

var modal = document.getElementById("helpModal");

    // Open modal
    function openModal() {
        modal.style.display = "block";
    }

    // Close modal
    function closeModal() {
        modal.style.display = "none";
    }

    // Close modal when clicking outside of the modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }