const dashboardLink = document.getElementById("dashboard-link");
const usersLink = document.getElementById("users-link");
const rolesLink = document.getElementById("roles-link");
const settingsLink = document.getElementById("settings-link");
const auditLink = document.getElementById("audit-link");

const dashboardSection = document.getElementById("dashboard-section");
const usersSection = document.getElementById("users-section");
const rolesSection = document.getElementById("roles-section");
const settingsSection = document.getElementById("settings");
const auditSection = document.getElementById("audit-logs");

const generalTab = document.getElementById("general-tab");
const accountTab = document.getElementById("account-tab");
const securityTab = document.getElementById("security-tab");
const notificationTab = document.getElementById("notification-tab");

const generalContent = document.getElementById("general-content");
const accountContent = document.getElementById("account-content");
const securityContent = document.getElementById("security-content");
const notificationContent = document.getElementById("notification-content");

const settingsForm = document.getElementById("settings-form");

const modal = document.getElementById("confirmation-modal");
const confirmButton = document.getElementById("confirm-button");
const cancelButton = document.getElementById("cancel-button");

const themeButton = document.getElementById("theme-button");

const auditFilter = document.getElementById("audit-filter");
const auditTable = document.getElementById("audit-table");


const settings = {
    siteName: "Admin Portal",
    adminEmail: "admin@example.com",
    language: "english",
    timezone: "india"
};


const auditLogs = [
    {
        date: "12 Aug 2026, 10:30 AM",
        user: "Admin",
        action: "Updated Settings",
        module: "Settings",
        status: "Success"
    },
    {
        date: "12 Aug 2026, 09:45 AM",
        user: "Manager",
        action: "Changed User Role",
        module: "Users",
        status: "Success"
    },
    {
        date: "11 Aug 2026, 04:20 PM",
        user: "Admin",
        action: "Updated Security",
        module: "Security",
        status: "Success"
    },
    {
        date: "11 Aug 2026, 03:10 PM",
        user: "Manager",
        action: "Failed Login",
        module: "Security",
        status: "Failed"
    },
    {
        date: "10 Aug 2026, 02:30 PM",
        user: "Admin",
        action: "Added New User",
        module: "Users",
        status: "Success"
    },
    {
        date: "10 Aug 2026, 11:15 AM",
        user: "Employee",
        action: "Login Failed",
        module: "Security",
        status: "Failed"
    }
];


function showSection(section) {
    section.scrollIntoView({
        behavior: "smooth"
    });
}


dashboardLink.addEventListener("click", function(event) {
    event.preventDefault();
    showSection(dashboardSection);
});


usersLink.addEventListener("click", function(event) {
    event.preventDefault();
    showSection(usersSection);
});


rolesLink.addEventListener("click", function(event) {
    event.preventDefault();
    showSection(rolesSection);
});


settingsLink.addEventListener("click", function(event) {
    event.preventDefault();
    showSection(settingsSection);
});


auditLink.addEventListener("click", function(event) {
    event.preventDefault();
    showSection(auditSection);
});


function showTab(tab, content) {

    generalTab.classList.remove("active");
    accountTab.classList.remove("active");
    securityTab.classList.remove("active");
    notificationTab.classList.remove("active");

    generalContent.classList.remove("active");
    accountContent.classList.remove("active");
    securityContent.classList.remove("active");
    notificationContent.classList.remove("active");

    tab.classList.add("active");
    content.classList.add("active");
}


generalTab.addEventListener("click", function(event) {
    event.preventDefault();
    showTab(generalTab, generalContent);
});


accountTab.addEventListener("click", function(event) {
    event.preventDefault();
    showTab(accountTab, accountContent);
});


securityTab.addEventListener("click", function(event) {
    event.preventDefault();
    showTab(securityTab, securityContent);
});


notificationTab.addEventListener("click", function(event) {
    event.preventDefault();
    showTab(notificationTab, notificationContent);
});


settingsForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const siteName = document.getElementById("site-name").value.trim();
    const adminEmail = document.getElementById("admin-email").value.trim();

    if (siteName === "") {
        alert("Please enter the site name.");
        return;
    }

    if (adminEmail === "") {
        alert("Please enter the admin email.");
        return;
    }

    if (!adminEmail.includes("@")) {
        alert("Please enter a valid email address.");
        return;
    }

    modal.style.display = "block";
});


confirmButton.addEventListener("click", function() {

    const siteName = document.getElementById("site-name").value.trim();
    const adminEmail = document.getElementById("admin-email").value.trim();
    const language = document.getElementById("language").value;
    const timezone = document.getElementById("timezone").value;

    settings.siteName = siteName;
    settings.adminEmail = adminEmail;
    settings.language = language;
    settings.timezone = timezone;

    localStorage.setItem(
        "adminSettings",
        JSON.stringify(settings)
    );

    modal.style.display = "none";

    alert("Settings saved successfully.");
});


cancelButton.addEventListener("click", function() {
    modal.style.display = "none";
});


themeButton.addEventListener("click", function() {

    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {

        localStorage.setItem("theme", "dark");

    } else {

        localStorage.setItem("theme", "light");
    }
});


const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
}


const savedSettings = localStorage.getItem("adminSettings");

if (savedSettings) {

    const oldSettings = JSON.parse(savedSettings);

    document.getElementById("site-name").value =
        oldSettings.siteName;

    document.getElementById("admin-email").value =
        oldSettings.adminEmail;

    document.getElementById("language").value =
        oldSettings.language;

    document.getElementById("timezone").value =
        oldSettings.timezone;

    settings.siteName = oldSettings.siteName;
    settings.adminEmail = oldSettings.adminEmail;
    settings.language = oldSettings.language;
    settings.timezone = oldSettings.timezone;
}


function displayAuditLogs(logs) {

    auditTable.innerHTML = "";

    if (logs.length === 0) {

        auditTable.innerHTML = `
            <tr>
                <td colspan="5">
                    No audit logs found.
                </td>
            </tr>
        `;

        return;
    }

    logs.forEach(function(log) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${log.date}</td>
            <td>${log.user}</td>
            <td>${log.action}</td>
            <td>${log.module}</td>
            <td>${log.status}</td>
        `;

        auditTable.appendChild(row);
    });
}


displayAuditLogs(auditLogs);


auditFilter.addEventListener("change", function() {

    const selectedStatus = auditFilter.value;

    if (selectedStatus === "all") {

        displayAuditLogs(auditLogs);

        return;
    }

    const filteredLogs = auditLogs.filter(function(log) {

        return log.status.toLowerCase() === selectedStatus;

    });

    displayAuditLogs(filteredLogs);
});


const accountSaveButton =
    document.getElementById("account-save-button");

accountSaveButton.addEventListener("click", function() {

    alert("Account settings saved.");

});


const securitySaveButton =
    document.getElementById("security-save-button");

securitySaveButton.addEventListener("click", function() {

    alert("Security settings saved.");

});


const notificationSaveButton =
    document.getElementById("notification-save-button");

notificationSaveButton.addEventListener("click", function() {

    alert("Notification settings saved.");

});