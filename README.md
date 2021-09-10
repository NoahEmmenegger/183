# 183 - Noah Emmenegger

## 01 XSS Keylogger
Ein Keylogger zeichnet die Interaktion von Benutzerinnen und Benutzern mit einer Webseite auf. In diesem Projekt werden die Tastatureingaben erfasst und an einen (fiktiven) Server des Angreifers übermittelt.

Im dieser Praxisarbeit wird lediglich die mögliche Implementation und Funktionsweise eines Keyloggers demonstriert. Nicht thematisiert wird hingegen das aktive Einfügen des (potentiell schadhaften) Codes in eine fremde Webseite. Dazu wurden im Unterricht entsprechende Übungen auf [https://xss-game.appspot.com](https://xss-game.appspot.com) gemacht.

## 02 Clickjacking / UI-Redress
Clickjacking ist eine Angriffsmethode, welche gegen Ende der 2000er-Jahre entstanden ist. Bei diesem Verfahren werden die Opfer der Attacke auf eine manipulierte Webeite gelockt. Auf dieser Webseite werden die Opfer zu Interaktionen (Klicks, Tastatureingaben, ...) animiert, welche einen anderen Effekt haben, als die Opfer zu glauben scheinen. Beispielsweise wird ein Button durch einen anderen (unsichtbaren) Button überlagert. Eine Spezialform des Clickjackings ist das erzeugen von fingierten (Login-)Formularen, welche die Eingaben der Opfer an den Server der Angreiferin übermitteln.

In dieser Praxisarbeit wurde eine HTML-Seite erzeugt, welche in einem `<iframe>` eine fremde Webseite darstellt. Das Login-Formular dieser Webseite wird durch ein selber erstelltes Formular geschickt überlagert, so dass die Zugangsdaten des Opfers beim Absenden des Formulars an die Webseite [https://m183.gibz-informatik.ch/clickjacked-credentials](https://m183.gibz-informatik.ch/clickjacked-credentials) übermittelt werden.

## 03 Sichere Passwörter

Diese Aufgabe wurde von Nicolas und Noah zusammen gelöst.

Anforderung ans Passwort:
Damit die Registrierung erfolgreich abgeschlossen werden kann, muss das Passwort die folgenden Anforderungen erfüllen:
- Das Passwort muss mindestens 8 Zeichen lang sein
- Die folgenden Zeichengruppen müssen im Passwort vertreten  sein: Großbuchstaben, Kleinbuchstaben, Ziffern und Sonderzeichen.
Das Passwort könnte natürlich noch mit mehr Sicherheitsbedingungen abgedeckt werden. Allerdings sollte es auch Bentuzerfreundlich blieben. Wenn man zu viele Bedinungenen festlegt, kann es für den Benutzer mühsam werden. Die oben genannten Punkte denken aber schon ein grossen Teil ab. Man könnte nun einfach noch mehr genauer konkrettisieren, dass z.B. eine bestimmte Anzahl an verschiedenen Zeichen vorkommen muss.

Validierung der Emailadresse:
Bei unserer Webseite wird auch die Emailadresse validert. Folgende Dinge werden beachten:
- Das Emailadressfeld darf nicht leer sein.
- Die Emailadresse muss ein gültigtes Format haben. (Die Adresse muss z.B. ein "@" Zeichen enthalten)

Abspeicherung vom Passwort in der Datenbank:
Wir haben uns dazu entschieden, dass wir das Passwort mit dem Bcrypt Algorithmus abspeichern, da dieser Algorithmus nach dem heutigen Stand als sicher gilt. Den Bcrypt Algorithmus haben wir nicht selbst geschrieben. Den Code für den Algorithmus haben wir von dem folgenden Github Repository: https://github.com/fpirsch/twin-bcrypt/blob/master/twin-bcrypt.min.js. In unserer Index Datei kann dann die Methode `hashSync` aufgerufen werden und das Passwort kann als Klartext übergeben werden. Die Methode liefert uns dann den Hash Wert zurück, welcher dann theoretisch in die Datenbank gespeichert werden könnte. In unserem Fall wird der Hashwert dann aber einfach, auf unserer Webseite ausgegeben werden.





