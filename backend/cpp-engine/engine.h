#ifndef ENGINE_H
#define ENGINE_H

#include <string>
#include <vector>

struct URLParts {
    std::string protocol;
    std::string domain;
    std::string path;
};

// Function prototypes
URLParts parseURL(const std::string& url);
double calculateEntropy(const std::string& str);
int calculateScore(const std::string& domain, const std::string& protocol, double entropy, const std::vector<std::string>& reasons);
bool isIPAddress(const std::string& domain);
int countSubdomains(const std::string& domain);

#endif
