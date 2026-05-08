#include <iostream>
#include <string>
#include <vector>
#include <map>

// External function declarations (from other files)
double calculateEntropy(const std::string& str);
struct URLParts {
    std::string protocol;
    std::string domain;
    std::string path;
};
URLParts parseURL(const std::string& url);
int calculateScore(const std::string& domain, const std::string& protocol, double entropy, const std::vector<std::string>& reasons);

int main(int argc, char* argv[]) {
    if (argc < 2) {
        std::cout << "{\"error\": \"No URL provided\"}" << std::endl;
        return 1;
    }

    std::string url = argv[1];
    URLParts parts = parseURL(url);
    double entropy = calculateEntropy(parts.domain);
    
    std::vector<std::string> reasons;
    if (parts.protocol != "https") reasons.push_back("Unsafe protocol (HTTP)");
    if (entropy > 4.0) reasons.push_back("High domain entropy (Randomness)");
    if (parts.domain.length() > 25) reasons.push_back("Suspiciously long domain");
    
    std::vector<std::string> keywords = {"login", "verify", "secure", "banking", "update", "signin", "paypal", "google", "microsoft"};
    for (const auto& kw : keywords) {
        if (parts.domain.find(kw) != std::string::npos) {
            reasons.push_back("Suspicious keyword detected: " + kw);
        }
    }

    int score = calculateScore(parts.domain, parts.protocol, entropy, reasons);
    
    std::string status = (score > 70) ? "dangerous" : (score > 40) ? "suspicious" : "safe";

    // Output as JSON for Node.js to consume
    std::cout << "{" << std::endl;
    std::cout << "  \"url\": \"" << url << "\"," << std::endl;
    std::cout << "  \"status\": \"" << status << "\"," << std::endl;
    std::cout << "  \"score\": " << score << "," << std::endl;
    std::cout << "  \"entropy\": " << entropy << "," << std::endl;
    std::cout << "  \"reasons\": [" << std::endl;
    for (size_t i = 0; i < reasons.size(); ++i) {
        std::cout << "    \"" << reasons[i] << "\"" << (i == reasons.size() - 1 ? "" : ",") << std::endl;
    }
    std::cout << "  ]" << std::endl;
    std::cout << "}" << std::endl;

    return 0;
}
