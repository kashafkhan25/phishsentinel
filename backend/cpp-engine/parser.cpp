#include <iostream>
#include <string>
#include <vector>

struct URLParts {
    std::string protocol;
    std::string domain;
    std::string path;
};

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
