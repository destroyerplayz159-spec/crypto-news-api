import 'dart:convert';
import 'package:http/http.dart' as http;

class CryptoNewsItem {
  final String title;
  final String source;
  final String url;
  final DateTime publishedAt;

  CryptoNewsItem({
    required this.title,
    required this.source,
    required this.url,
    required this.publishedAt,
  });

  factory CryptoNewsItem.fromJson(Map<String, dynamic> json) {
    return CryptoNewsItem(
      title: json['title'] ?? '',
      source: json['source']['title'] ?? 'Unknown',
      url: json['url'] ?? '',
      publishedAt: DateTime.tryParse(json['published_at'] ?? '') ?? DateTime.now(),
    );
  }
}

Future<List<CryptoNewsItem>> fetchCryptoNews(String category, String token) async {
  final filterMap = {
    'Breaking News': 'breaking',
    'Top Market Movers': 'hot',
    'Exchange Updates': 'exchange',
    'Security Alerts': 'security',
    'Regulatory News': 'regulation',
  };

  final filter = filterMap[category] ?? 'trending';
  final tokenParam = token != 'All' ? '&currencies=${token.toLowerCase()}' : '';

  final url = Uri.parse(
    'https://crypto-news-proxy.onrender.com/crypto-news?filter=$filter$tokenParam',
  );

  final response = await http.get(url);

  if (response.statusCode == 200) {
    final json = jsonDecode(response.body);
    final results = json['results'] as List;
    return results.map((e) => CryptoNewsItem.fromJson(e)).toList();
  } else {
    throw Exception('Failed to fetch news');
  }
}
