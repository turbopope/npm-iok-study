As part of my Master's Thesis on programming expertise distribution in open source software, I analyzed the repositories of some popular NPM packages for so-called Islands of Knowledge.

Islands of Knowledge are a metric for the [Bus Factor](https://en.wikipedia.org/wiki/Bus_factor) of a project (which states how many developers can get hit by a bus before the project is incapacitated). An Island of Knowledge exists when single a developer alone has expertise in an programming domain. A programming domain is an area of expertise about certain programming tasks, like working with databases or web APIs.

To find Islands of Knowledge, I implemented a data mining process to count how many times each developer used each module and combined the numbers for modules in the same domain (for example the *IO* domain contains, among others, the modules `fs` and `path`). "Modules" in this sense also means global objects like `console`.

I analyzed `bower/bower` and found the following potential canditates for Islands of Knowledge:

| Developer | Domain | Modules/Objects | % of uses |
| --- | --- | --- | --- |
| André Cruz | MODULE | module, exports, graceful-fs | 70% |
| André Cruz | IO | fs, path, tty, url, zlib | 66% |

To validate my results, I would like to ask the `bower/bower` developers a few simple questions:

1. Do you think that the listed developers have most of the knowledge of the listed programming domains?
2. Do you think that `bower/bower` may be in trouble if the listed developers leave the project?
3. Does `bower/bower` have some characteristics such as detailed documentation so that the loss of the listed developers would be less troublesome?
4. Do you think that the assignment of modules to domains shown above is reasonable?

Thanks in advance for your collaboration,

```
Marco Brack
Software Languages Team
Koblenz, Germany
http://www.softlang.org/
```
