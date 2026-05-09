#include "engine.h"
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

int calculateScore(const std::string& domain, const std::string& protocol, double entropy, const std::vector<std::string>& reasons) {
    int score = 0;
    
    // Protocol scoring
    if (protocol != "https") {
        score += 15;
    }
    
    // Entropy scoring
    if (entropy > 4.2) {
        score += 25;
    } else if (entropy > 3.8) {
        score += 15;
    }
    
    // Domain length scoring
    if (domain.length() > 25) {
        score += 15;
    }
    
    // IP-based URL
    if (isIPAddress(domain)) {
        score += 30;
    }

    // Excessive subdomains
    if (countSubdomains(domain) > 3) {
        score += 15;
    }

    // Suspicious keywords in domain
    std::vector<std::string> keywords = {"login", "verify", "secure", "banking", "update", "signin", "paypal", "google", "microsoft", "account"};
    for (const auto& kw : keywords) {
        if (domain.find(kw) != std::string::npos) {
            score += 20;
            break;
        }
    }

    return std::min(score, 100);
}
