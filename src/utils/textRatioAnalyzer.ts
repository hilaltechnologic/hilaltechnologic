// Text-to-HTML Ratio Analyzer
// Utility untuk mengukur dan menganalisis rasio text content terhadap HTML markup

export interface TextRatioAnalysis {
  textContent: string;
  htmlContent: string;
  textLength: number;
  htmlLength: number;
  ratio: number;
  ratioPercentage: string;
  grade: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  recommendations: string[];
}

export class TextRatioAnalyzer {
  
  /**
   * Analyze text-to-HTML ratio from HTML string
   */
  static analyzeHTML(htmlString: string): TextRatioAnalysis {
    // Remove scripts, styles, and comments
    const cleanHTML = htmlString
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    // Extract text content
    const textContent = cleanHTML
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    const textLength = textContent.length;
    const htmlLength = cleanHTML.length;
    const ratio = htmlLength > 0 ? (textLength / htmlLength) * 100 : 0;
    
    return {
      textContent,
      htmlContent: cleanHTML,
      textLength,
      htmlLength,
      ratio,
      ratioPercentage: `${ratio.toFixed(2)}%`,
      grade: this.getGrade(ratio),
      recommendations: this.getRecommendations(ratio)
    };
  }
  
  /**
   * Analyze text-to-HTML ratio from DOM element
   */
  static analyzeElement(element: Element): TextRatioAnalysis {
    return this.analyzeHTML(element.outerHTML);
  }
  
  /**
   * Get grade based on ratio
   */
  private static getGrade(ratio: number): 'Poor' | 'Fair' | 'Good' | 'Excellent' {
    if (ratio >= 25) return 'Excellent';
    if (ratio >= 20) return 'Good';
    if (ratio >= 15) return 'Fair';
    return 'Poor';
  }
  
  /**
   * Get recommendations based on ratio
   */
  private static getRecommendations(ratio: number): string[] {
    const recommendations: string[] = [];
    
    if (ratio < 15) {
      recommendations.push('Tambahkan lebih banyak text content yang meaningful');
      recommendations.push('Kurangi HTML markup yang tidak perlu');
      recommendations.push('Pindahkan inline styles ke external CSS');
      recommendations.push('Gunakan semantic HTML untuk struktur yang lebih efisien');
    }
    
    if (ratio < 20) {
      recommendations.push('Optimalkan struktur HTML untuk mengurangi markup');
      recommendations.push('Tambahkan deskripsi dan penjelasan yang lebih detail');
      recommendations.push('Gunakan text content yang relevan dengan topik');
    }
    
    if (ratio < 25) {
      recommendations.push('Pertimbangkan untuk menambah FAQ atau tutorial section');
      recommendations.push('Tambahkan meta description dan alt text yang descriptive');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Rasio text-to-HTML sudah optimal!');
      recommendations.push('Pertahankan kualitas content dan struktur HTML');
    }
    
    return recommendations;
  }
  
  /**
   * Generate detailed report
   */
  static generateReport(analysis: TextRatioAnalysis): string {
    return `
Text-to-HTML Ratio Analysis Report
==================================

📊 Metrics:
- Text Length: ${analysis.textLength.toLocaleString()} characters
- HTML Length: ${analysis.htmlLength.toLocaleString()} characters
- Ratio: ${analysis.ratioPercentage}
- Grade: ${analysis.grade}

📝 Text Preview:
${analysis.textContent.substring(0, 200)}${analysis.textContent.length > 200 ? '...' : ''}

💡 Recommendations:
${analysis.recommendations.map(rec => `- ${rec}`).join('\n')}

🎯 Optimization Tips:
- Target ratio: 20-25% for optimal SEO
- Focus on meaningful, relevant content
- Minimize unnecessary HTML markup
- Use external CSS instead of inline styles
- Implement lazy loading for non-critical elements
    `.trim();
  }
  
  /**
   * Browser-based analyzer (for client-side usage)
   */
  static createBrowserAnalyzer() {
    return {
      analyzePage: () => {
        if (typeof document === 'undefined') {
          throw new Error('Browser analyzer can only be used in browser environment');
        }
        
        return TextRatioAnalyzer.analyzeElement(document.documentElement);
      },
      
      analyzeElement: (selector: string) => {
        if (typeof document === 'undefined') {
          throw new Error('Browser analyzer can only be used in browser environment');
        }
        
        const element = document.querySelector(selector);
        if (!element) {
          throw new Error(`Element with selector "${selector}" not found`);
        }
        
        return TextRatioAnalyzer.analyzeElement(element);
      },
      
      logReport: (selector?: string) => {
        const analysis = selector 
          ? TextRatioAnalyzer.createBrowserAnalyzer().analyzeElement(selector)
          : TextRatioAnalyzer.createBrowserAnalyzer().analyzePage();
        
        console.log(TextRatioAnalyzer.generateReport(analysis));
        return analysis;
      }
    };
  }
}

// Export browser analyzer for global usage
export const browserAnalyzer = TextRatioAnalyzer.createBrowserAnalyzer();

// Export utility functions
export const analyzeHTML = TextRatioAnalyzer.analyzeHTML;
export const generateReport = TextRatioAnalyzer.generateReport;
