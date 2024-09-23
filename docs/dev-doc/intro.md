# 开发入门
:::tip

在查阅开发文档时，你需要具备以下基础知识：

1. 基本的 Java 概念
2. 熟悉 Fabric 或 (Neo)Forge 的 Minecraft 模组开发

如果你不太了解，请先学习[模组开发教程](https://wiki.mcjty.eu/modding/index.php?title=YouTube-Tutorials)。
:::

Ayame 的 JavaDoc 与模块化使得您可以轻松为其开发扩展模组。

---

要将 Ayame 导入您的项目以为其制作扩展，请先在 `build.gradle` 中添加以下内容：
```groovy title="build.gradle"
// 这是 build.gradle 中的 repositories 块，没有就创建一个
repositories {
    maven {
        name = 'Ayame Maven Repo'
        url 'https://maven.ayamemc.org/'
    }
}
```
