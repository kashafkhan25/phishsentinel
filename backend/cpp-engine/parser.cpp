#include "engine.h"
#include <iostream>
#include <string>
#include <vector>

URLParts parseURL(const std::string& url) {
    URLParts parts;
    size_t protocolEnd = url.find("://");
    
    if (protocolEnd != std::string::npos) {
        parts.protocol = url.substr(0, protocolEnd);
        std::string rest = url.substr(protocolEnd + 3);
        
        size_t pathStart = rest.find("/");
        if (pathStart != std::string::npos) {
            parts.domain = rest.substr(0, pathStart);
            parts.path = rest.substr(pathStart);
        } else {
            parts.domain = rest;
            parts.path = "/";
        }
    } else {
        parts.protocol = "none";
        size_t pathStart = url.find("/");
        if (pathStart != std::string::npos) {
            parts.domain = url.substr(0, pathStart);
            parts.path = url.substr(pathStart);
        } else {
            parts.domain = url;
            parts.path = "/";
        }
    }
    
    return parts;
}

bool isIPAddress(const std::string& domain) {
    int dots = 0;
    bool allDigits = true;
    for (char c : domain) {
        if (c == '.') dots++;
        else if (!isdigit(c)) allDigits = false;
    }
    return dots == 3 && allDigits;
}

int countSubdomains(const std::string& domain) {
    int dots = 0;
    for (char c : domain) {
        if (c == '.') dots++;
    }
    return dots;
}
