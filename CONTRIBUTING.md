# Contributing

很高兴你想为Vimo做出贡献，想成为贡献者，希望你能先阅读下面列出的指导手册。

 - [贡献者行为准则(Code of Conduct)](#coc)
 - [如何提问(Question or Problem?)](#question)
 - [Issues and Bugs](#issue)
 - [Feature Requests](#feature)
 - [提交指南(Submission Guidelines)](#submit)
 - [代码规范(Coding Rules)](#rules)
 - [Git提交规范(Commit Message Guidelines)](#commit)


## <a name="coc"></a> 贡献者行为准则(Code of Conduct)
帮助我们改进Vimo？ 没问题，请先 **[同意]** [贡献者行为准则(Code of Conduct)][coc].

## <a name="question"></a> 使用过程中的疑问(Question or Problem?)

希望你在Open Issue时能针对性的提出Vimo现在的问题，而不是提出和Vimo**没直接关系**的XX问题，比如：

- vue如何使用？
- 如何安装nodejs？
- npm怎样安装依赖？
- 我的项目怎么引入Vimo组件？

当然，使用Vimo之前希望你能充分了解Vimo的特点并且大致阅读了[文档]()和[FAQ]()。如果类似上述的问题依旧存在，建议你先在[Stack Overflow](https://stackoverflow.com)、Google、Baidu、Github等网站查找下问题，这样会节省你我的时间。同时，你提出这些XX问题我会关闭的。


## <a name="issue"></a> Found a Bug?
If you find a bug in the source code, you can help us by
[submitting an issue](#submit-issue) to our [GitHub Repository][github]. Even better, you can
[submit a Pull Request](#submit-pr) with a fix.

## <a name="feature"></a> Missing a Feature?
You can *request* a new feature by [submitting an issue](#submit-issue) to our GitHub
Repository. If you would like to *implement* a new feature, please submit an issue with
a proposal for your work first, to be sure that we can use it.
Please consider what kind of change it is:

* For a **Major Feature**, first open an issue and outline your proposal so that it can be
discussed. This will also allow us to better coordinate our efforts, prevent duplication of work,
and help you to craft the change so that it is successfully accepted into the project.
* **Small Features** can be crafted and directly [submitted as a Pull Request](#submit-pr).

## <a name="submit"></a> 提交指南(Submission Guidelines)

### <a name="submit-issue"></a> Submitting an Issue

在你提出问题之前，请先在Issue中搜索下是否存在相同或者相似的问题，也许在这个问题下已经有人指出的问题解决办法，这将会节省你很多时间。

当然，我也希望提出的Issue我能立刻解决，在定位这个"BUG"时，我需要你能提供更多的信息，比如：

- 哪个版本、什么组件
- 正确情况应该是什么反应，但是出现了什么问题

如果描述的情况无法定位问题点，我将关闭这个Issue。



### <a name="submit-pr"></a> Submitting a Pull Request (PR)
Before you submit your Pull Request (PR) consider the following guidelines:

* Search [GitHub](https://github.com/angular/angular/pulls) for an open or closed PR
  that relates to your submission. You don't want to duplicate effort.
* Please sign our [Contributor License Agreement (CLA)](#cla) before sending PRs.
  We cannot accept code without this.
* Make your changes in a new git branch:

     ```shell
     git checkout -b my-fix-branch master
     ```

* Create your patch, **including appropriate test cases**.
* Follow our [Coding Rules](#rules).
* Run the full Angular test suite, as described in the [developer documentation][dev-doc],
  and ensure that all tests pass.
* Commit your changes using a descriptive commit message that follows our
  [commit message conventions](#commit). Adherence to these conventions
  is necessary because release notes are automatically generated from these messages.

     ```shell
     git commit -a
     ```
  Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

* Push your branch to GitHub:

    ```shell
    git push origin my-fix-branch
    ```

* In GitHub, send a pull request to `angular:master`.
* If we suggest changes then:
  * Make the required updates.
  * Re-run the Angular test suites to ensure tests are still passing.
  * Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

    ```shell
    git rebase master -i
    git push -f
    ```

That's it! Thank you for your contribution!

#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes
from the main (upstream) repository:

* Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

    ```shell
    git push origin --delete my-fix-branch
    ```

* Check out the master branch:

    ```shell
    git checkout master -f
    ```

* Delete the local branch:

    ```shell
    git branch -D my-fix-branch
    ```

* Update your master with the latest upstream version:

    ```shell
    git pull --ff upstream master
    ```

## <a name="rules"></a> 代码规范(Coding Rules)

Vimo编码使用的[StandardJS](https://github.com/standard/standard)规范。

为了保证代码质量，希望你在commit修改时不要跳过```Git Hooks```，因为目前设置的```Git Hooks```会检查代码规范的，不符合**StandardJS规范**和**Commit信息格式不对**都会终止commit行为。Commit提交规范下面会说明。


## <a name="commit"></a> Git提交规范(Commit Message Guidelines)

代码编写完毕提交时，commit信息会进行严格校验。这样做是为了让commit记录能够**准确反映当次提交的代码情况**，这样能方便定位提交点，并且根据提交记录自动生成可用的```CHANGELOG```记录，这个记录也会用于**[Github-Release](https://github.com/DTFE/vimo/releases)**。

### Commit信息提交格式(Commit Message Format)

提交信息(Commit Message)包含三部分：**header**, **body** 和 **footer**。**header**的格式包括：**type**, **scope** 和  **subject**

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

**header**必须要写，但是**scope**可以不填。此外，**header**中提交的信息不要超过100个字符，这是便于在Github、Git工具上能方便的阅读。

如果有Issue需要关闭，则**footer**应该包含一个[指向该问题的id](https://help.github.com/articles/closing-issues-via-commit-messages/)，例如：#212


示例: (even more [samples](https://github.com/angular/angular/commits/master))

```
docs(changelog): update change log to beta.5
```
```
fix(release): need to depend on latest rxjs and zone.js (#1231)

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

### Revert
重置上一次提交，书写格式：`revert: This reverts commit <hash>.`


### Type

上面格式中提到的```type```必须是下面中的一个：

* **build**: 构建工具的修改(example scopes: gulp, broccoli, npm)
* **ci**: 新增修改CI配置文件或者脚本文件(example scopes: Travis, Circle, BrowserStack, SauceLabs)
* **docs**: 文档相关的改变
* **feat**: 增加一个新特性
* **fix**: 修复bug
* **perf**: 修改代码提高性能
* **refactor**: 重构
* **style**: 代码格式修改(white-space, formatting, missing semi-colons, etc)
* **test**: 新增或者修改测试代码
* **chore**: 杂项，不修改src/test文件夹的中内容的修改
* **revert**: 重写上一个提交


### Scope
变化的范围，用于向阅读CHANGELOG的用户说明改动的范围。


### Subject
简要描述改变点，类似于副标题


### Body
具体描述**subject**的改变，描述改变的具体过程。


### Footer

footer可以包含一些重大改变(**Breaking Changes**)的说明，也可以表示关闭的**Closes**信息。

如果是**Breaking Changes**，需要以`BREAKING CHANGE:`开头， 空两格或者开启新行， 之后写上具体的描述。

以上具体文档可在这个[文档][commit-message-format]中找到。

[angular-group]: https://groups.google.com/forum/#!forum/angular
[coc]: https://github.com/angular/code-of-conduct/blob/master/CODE_OF_CONDUCT.md
[commit-message-format]: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#
[corporate-cla]: http://code.google.com/legal/corporate-cla-v1.0.html
[dev-doc]: https://github.com/angular/angular/blob/master/docs/DEVELOPER.md
[github]: https://github.com/angular/angular
[gitter]: https://gitter.im/angular/angular
[individual-cla]: http://code.google.com/legal/individual-cla-v1.0.html
[js-style-guide]: https://google.github.io/styleguide/jsguide.html
[jsfiddle]: http://jsfiddle.net
[plunker]: http://plnkr.co/edit
[runnable]: http://runnable.com
[stackoverflow]: http://stackoverflow.com/questions/tagged/angular