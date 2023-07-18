let ubcb_settings = {};
let ubcb_loaded = false;

function ubcb_init() {
    // Load settings
    let settings = browser.storage.local.get().then((result) => {
        ubcb_settings = result;
        ubcb_loaded = true;
    });
}

// Call when plugin is loaded or settings are changed
ubcb_init();

// Listen for changes to settings
browser.storage.onChanged.addListener(ubcb_init);


function ubcb_get_hostnames_per_environment_from_settings() {    
    // Get the hostnames per environment
    let hostnames_per_environment = {
        "dev": ubcb_settings.devHostnames || "",
        "qa": ubcb_settings.qaHostnames || "",
        "prod": ubcb_settings.prodHostnames || ""
    };

    hostnames_per_environment.dev = hostnames_per_environment.dev.split("\n");
    hostnames_per_environment.qa = hostnames_per_environment.qa.split("\n");
    hostnames_per_environment.prod = hostnames_per_environment.prod.split("\n");

    return hostnames_per_environment;
}


function ubcb_get_url_environment(url) {
    // Parse URL
    let urlObj = new URL(url);

    if (urlObj.hostname == "" ) {
        return undefined;
    }

    hostnames_per_environment = ubcb_get_hostnames_per_environment_from_settings();

    if (urlObj.hostname == "localhost" || urlObj.hostname == "127.0.0.1" ) {
        return "local";
    }

    if (urlObj.hostname.startsWith("dev-") || hostnames_per_environment.dev.includes(urlObj.hostname)) {
        return "dev";
    }

    if (urlObj.hostname.startsWith("qa-") || hostnames_per_environment.qa.includes(urlObj.hostname)) {
        return "qa";
    }

    if (hostnames_per_environment.prod.includes(urlObj.hostname)) {
        return "prod";
    }

    return undefined;

}

function ubcb_get_environment_frame_color(environment) {
    switch (environment) {
        case "local":
            return "#AAFFAA";
        case "dev":
            return "#44FF44";
        case "qa":
            return "#4444FF";
        case "prod":
            return "#FF4444";
    }
    return undefined;
}

function ubcb_tab_switched(activeInfo) {

    if( !ubcb_loaded ) {
        return;
    }

    browser.tabs.get(activeInfo.tabId)
    .then(tabInfo => {
        let environment = ubcb_get_url_environment(tabInfo.url);
        let color = ubcb_get_environment_frame_color(environment);
        browser.theme.update({colors: {frame: color}});
    });
    
}

function ubcb_url_switched(tabId, changeInfo, tabInfo) {
    if( !ubcb_loaded ) {
        return;
    }

    ubcb_tab_switched({tabId});

}

browser.tabs.onActivated.addListener(ubcb_tab_switched);
browser.tabs.onUpdated.addListener(ubcb_url_switched);
