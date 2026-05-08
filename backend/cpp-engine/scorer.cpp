#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

int calculateScore(const std::string& domain, const std::string& protocol, double entropy, const std::vector<std::string>& reasons) {
    int score = 0;
    
    // Protocol scoring
    if (protocol != "https") {
        score += 20;
    }
    
    // Entropy scoring
    if (entropy > 4.0) {
        score += 30;
    } else if (entropy > 3.5) {
        score += 15;
    }
    
    // Domain length scoring
    if (domain.length() > 25) {
        score += 15;
    }
    
    // Suspicious keywords in domain (simplified for demo)
    std::vector<std::string> keywords = {"login", "verify", "secure", "banking", "update", "signin"};
    for (const auto& kw : keywords) {
        if (domain.find(kw) != std::string::npos) {
            score += 25;
            break;
        }
    }

    return std::min(score, 100);
}
