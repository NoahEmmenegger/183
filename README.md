# 183 - Noah Emmenegger

## 01 XSS Keylogger
Ein Keylogger zeichnet die Interaktion von Benutzerinnen und Benutzern mit einer Webseite auf. In diesem Projekt werden die Tastatureingaben erfasst und an einen (fiktiven) Server des Angreifers übermittelt.

Im dieser Praxisarbeit wird lediglich die mögliche Implementation und Funktionsweise eines Keyloggers demonstriert. Nicht thematisiert wird hingegen das aktive Einfügen des (potentiell schadhaften) Codes in eine fremde Webseite. Dazu wurden im Unterricht entsprechende Übungen auf [https://xss-game.appspot.com](https://xss-game.appspot.com) gemacht.

## 02 Clickjacking / UI-Redress
Clickjacking ist eine Angriffsmethode, welche gegen Ende der 2000er-Jahre entstanden ist. Bei diesem Verfahren werden die Opfer der Attacke auf eine manipulierte Webeite gelockt. Auf dieser Webseite werden die Opfer zu Interaktionen (Klicks, Tastatureingaben, ...) animiert, welche einen anderen Effekt haben, als die Opfer zu glauben scheinen. Beispielsweise wird ein Button durch einen anderen (unsichtbaren) Button überlagert. Eine Spezialform des Clickjackings ist das erzeugen von fingierten (Login-)Formularen, welche die Eingaben der Opfer an den Server der Angreiferin übermitteln.

In dieser Praxisarbeit wurde eine HTML-Seite erzeugt, welche in einem `<iframe>` eine fremde Webseite darstellt. Das Login-Formular dieser Webseite wird durch ein selber erstelltes Formular geschickt überlagert, so dass die Zugangsdaten des Opfers beim Absenden des Formulars an die Webseite [https://m183.gibz-informatik.ch/clickjacked-credentials](https://m183.gibz-informatik.ch/clickjacked-credentials) übermittelt werden.

