import os
import requests

# GitHub API Token 和评论信息
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
COMMENT_BODY = os.getenv("COMMENT_BODY")
COMMENT_ID = os.getenv("COMMENT_ID")

# 敏感词列表的 URL
SENSITIVE_WORDS_URL = "https://raw.githubusercontent.com/fwwdn/sensitive-stop-words/refs/heads/master/政治类.txt"

# GitHub GraphQL API 端点
GITHUB_GRAPHQL_API = "https://api.github.com/graphql"

# 获取敏感词列表
def fetch_sensitive_words(url):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()  # 确保 HTTP 请求成功
        words = response.text.strip().split("\n")  # 读取内容并按换行符分割
        return [word.strip().rstrip(",") for word in words if word.strip()]  # 去除空行和行末的 ,
    except requests.RequestException as e:
        print(f"Failed to fetch sensitive words: {e}")
        return []

# 加载敏感词
SENSITIVE_WORDS = fetch_sensitive_words(SENSITIVE_WORDS_URL)

# 逐字符匹配并替换敏感词
def censor_text(text, words):
    text_chars = list(text)  # 将文本转换为字符列表
    text_lower = text.lower()  # 统一转换为小写，保证匹配不区分大小写

    for word in words:
        word_len = len(word)
        search_pos = 0

        while search_pos <= len(text) - word_len:
            # 提取子串进行匹配（忽略大小写）
            substring = text_lower[search_pos : search_pos + word_len]

            if substring == word.lower():  # 如果匹配到敏感词
                text_chars[search_pos : search_pos + word_len] = "*" * word_len  # 替换字符
            search_pos += 1  # 继续匹配下一个位置

    return "".join(text_chars)  # 重新拼接成字符串

# 处理评论
if COMMENT_BODY:
    new_comment_body = censor_text(COMMENT_BODY, SENSITIVE_WORDS)

    if new_comment_body != COMMENT_BODY:
        query = """
        mutation ($id: ID!, $body: String!) {
          updateDiscussionComment(input: {commentId: $id, body: $body}) {
            comment {
              body
            }
          }
        }
        """
        headers = {
            "Authorization": f"Bearer {GITHUB_TOKEN}",
            "Content-Type": "application/json"
        }
        payload = {
            "query": query,
            "variables": {"id": COMMENT_ID, "body": new_comment_body}
        }

        response = requests.post(GITHUB_GRAPHQL_API, json=payload, headers=headers)

        if response.status_code == 200:
            print("Updated the comment by replacing sensitive words with corresponding-length asterisks.")
        else:
            print(f"Failed to update comment: {response.status_code}, {response.text}")