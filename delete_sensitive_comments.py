import os
import requests
import re

# GitHub API Token 和评论信息
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
COMMENT_BODY = os.getenv("COMMENT_BODY")
COMMENT_ID = os.getenv("COMMENT_ID")

# 敏感词列表的 URL（4 个列表）
SENSITIVE_WORDS_URLS = [
    "https://raw.githubusercontent.com/fwwdn/sensitive-stop-words/refs/heads/master/政治类.txt",
    "https://raw.githubusercontent.com/fwwdn/sensitive-stop-words/refs/heads/master/涉枪涉爆违法信息关键词.txt",
    "https://raw.githubusercontent.com/fwwdn/sensitive-stop-words/refs/heads/master/色情类.txt",
    "https://raw.githubusercontent.com/fwwdn/sensitive-stop-words/refs/heads/master/网址.txt",
]

# GitHub GraphQL API 端点
GITHUB_GRAPHQL_API = "https://api.github.com/graphql"

# 获取所有敏感词并合并
def fetch_and_merge_sensitive_words(urls):
    merged_text = ""  # 存储所有敏感词的文本
    for url in urls:
        try:
            response = requests.get(url)
            response.raise_for_status()  # 确保请求成功
            merged_text += "\n" + response.text  # 合并所有文件内容
        except requests.RequestException as e:
            print(f"Failed to fetch sensitive words from {url}: {e}")
    
    # 解析敏感词列表（去掉逗号、去空行、去空格）
    words = set(word.strip().rstrip(",") for word in merged_text.splitlines() if word.strip())
    return list(words)  # 转换回列表

# 加载所有敏感词
SENSITIVE_WORDS = fetch_and_merge_sensitive_words(SENSITIVE_WORDS_URLS)

# 过滤并替换敏感词
def censor_text(text, words):
    def replace_match(match):
        return "*" * len(match.group())  # 替换为等长的星号

    pattern = re.compile("|".join(re.escape(word) for word in words), re.IGNORECASE)
    return pattern.sub(replace_match, text)

# 处理评论
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
        print(f"Failed to update comment: {response.text}")
else:
    print("No sensitive words detected.")