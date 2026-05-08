#include <iostream>
#include <string>
#include <vector>
#include <cmath>
#include <map>

double calculateEntropy(const std::string& str) {
    if (str.empty()) return 0.0;
    
    std::map<char, int> freq;
    for (char c : str) {
        freq[c]++;
    }
    
    double entropy = 0.0;
    double len = static_cast<double>(str.length());
    
    for (auto const& pair : freq) {
        double p = pair.second / len;
        entropy -= p * log2(p);
    }
    
    return entropy;
}
