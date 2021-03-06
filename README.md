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



## 04 Zweifaktor-Authentifizierung mit TOTP

Dieses Projekt dient vorallem als Übung/Demo für TOTP. Man gelingt bewusst auch ohne Anmeldung ins Dashboard. Bei mehr Zeit würde das natürlich auch noch implementiert werden. Jedoch liegt bei dieser Praxisarbeit der Fokus auf TOTP.

Das Projekt wurde nicht mit der Projektvorlage umgesetzt. 

**Weshalb node.js express?**
Meine lieblings Programmiersprache ist JavaScript/Node.js. Jedoch habe ich noch nie mit Express gearbeitet. Ich wollte schon immer mal express besser kennenlernen, und desshalb habe ich mich für express entschieden.

**Zusätzliche überlegung**
Damit die Applikation zu 100% weiss, dass der user den QR code erfolgreich eingerichtet hat, muss man den Token gleich noch eingeben.

**Users (jeweils Benutzername - Passwort)**
* donald - niceHair
* joe - kamala

*Falls man weitere User erstellen möchte, kann man das users.json erweitern.*

**<u>Reflexion</u>**

Ich hatte am Anfang extrem viel Mühe das npm package "Speakeasy" anzuwenden. Denn ich habe es nie geschafft, ein valides Resultat zu erzeugen (Token und Secret haben nie miteinander übereinander gestummen). Demensprechend versuchte ich am Anfang den QR-Code in der Projekt-Präsentation in meine Applikation einzubauen, denn ich dachte, dass dies ein guter Zwischenschritt wäre, um langsam an das Ziel zu kommen. Jedoch habe ich extrem viel Zeit damit vergeudet, dass aus irgendeinem Grund dieser Security-Token aus der Projekt-Präsentation, welcher period 10 hatte, von Speakeasy nie als valid gegulten hatte... Ich habe sogar meinen Berufsbildner gefragt und sogar er konnte mir nicht weiterhelfen. Nach langen ausprobieren hatte ich dann endlich die richtigen parameter (encoding, algorithm, step, digits) und das Wissen wie man "Speakeasy" richtig anwenden sollte.

**Feedback an Praxisarbeit:** Super spannendes Thema, was mir enorm viel Spass gemacht macht. Jedoch fast ein bisschen zu grosser Aufwand für in nur 5 Tagen.



## 05 Single Sign On
**Worklfow**
1. Startseite öffnen
2. Sign in with google
3. Account auswählen
4. Man gelingt zum Dashboard -> Token wird in Cookies gespeichert, damit man sich beim nächsten Mal nicht mehr einloggen muss.
5. Startseite erneut aufrufen. Man wird automatisch wieder zum dashboard weitergeleitet.
6. Sign out drücken. Man wird dann auf die Startseite weitergeleitet und man könnte sich mit einem Anderen Account anmelden.
7. Auf Dashboard versuchen zuzugreifen -> ohne dass man eingeloggt ist. Man wird dann automatisch auf eine 403 Seite weitergeleitet.

**Account**

Sobald man das erste mal mit Google eingeloggt hat, wird die Email und die UserId abgespreicherrt. Falls diese Applikation produktiv gebraucht werden würde, könnte man das User-Objekt erweitern.

**Reflexion**

Ich finde Google - OAuth sehr Nützlich. Sowohl für den Benutzer wie auch für den Developer ist es sehr einfach anzuwenden. Ich kann mir gut vorstellen, dass ich private Projekte öfters mit OAuth erstelle. Aussedem ist OAuth auch ziemlich sicher und trotzdem einfach für den Nutzer anwendbar.
Bis heute habe ich immer auf diese Funktion verzichtet, wenn ich auf einer Webseite die Möglichkeit hatte mit OAuth einzuloggen. Denn ich dachte, dass die Webseitenbetreiber so an kritische Daten von meinem Google-Profil kommen. Jedoch weiss ich jetzt, dass das ganze Ziemlich sicher ist und werde jetzt öfters auf diese Funktionalität zugreiffen. 



## 06 HTTP Digest Authentication

Ich fand diese Praxisarbeit spannend, weil man sich mal zuerst in ein anderen Code einlesen musste, bevor man starten kann. Denn ich habe bis jetzt immer ohne Projektvorlage gearbeitet. 

Das implementieren war mit Hilfe des wikipedia Eintrages ziemlich einfach umzusetzen. Leider habe ich viel Zeit damit vergeudet, dass ich die quotes falsch gesetzt habe.

**Vertiefung**

Da ich noch nicht viel mit Docker gearbeitet habe, fand ich die Vertiefung ziemlich schwierig. Im htaccess file muss man ja den Pfad zum htpasswd file angeben. Jedoch habe ich den korrenten pfad nicht herausgefunden. Es gab immer die Fehlermeldung "directory can not be found". Und weil ich docker eben nicht so gut kannte, musste ich mich über die Filestruktur in einem Docker container informieren. Ich verschte mit WINSCP in den Docker container reinzuschauen, damit ich die Filestruktur sehen könnte, jedoch habe ich nach längeren Ausprobieren herausgefunden, dass das mit SFTP nicht funktionierte. Zum Glück habe ich dann den Befehl "docker-compose exec apache sh" gefunden. Mit diesem Command konnte ich in den docker-container rein ssh connecten. Jedoch fiel es mir weiterhin schwer den richtigen Pfad herauszufinden. Nach einer Google-recherche habe ich den Command "find . -name "foo*"" gefunden. Mit diesem command kann man in einem linux filesystem nach dateien suchen. Das hat dann ein erfolgreiches ergebnis angezeigt und ich hatte endlich den pfad, in welchem meine files waren. Und so konnte ich dann auch den korrekten pfad für das htacces file finden. Die files sind unter "/var/www/". 



## 07 Cross-Site Request Forgery

Diese Praxisarbeit ist mir sehr einfach gelungen. Denn man konnte ganz einfach de Requests kopieren.