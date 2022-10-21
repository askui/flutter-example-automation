import 'package:flutter/material.dart';
import 'OutlineForm.dart';
import 'NoutlineForm.dart';
import 'MultiButton.dart';
import 'Datepicker.dart';
import 'camera.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  static const String _title = 'Flutter Code Sample';

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: _title,
      home: MyStatelessWidget(),
    );
  }
}

String? _validateName(String? value) {
  if (value == null || value.isEmpty) {
    return 'Please enter your name';
  }
  final nameExp = RegExp(r'^[A-Za-z ]+$');
  if (!nameExp.hasMatch(value)) {
    return 'Please enter only alphabetical characters';
  }
  return null;
}

class MyStatelessWidget extends StatelessWidget {
  const MyStatelessWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      initialIndex: 1,
      length: 4,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('TabBar Widget'),
          bottom: const TabBar(
            tabs: <Widget>[
              Tab(icon: Icon(Icons.cloud_outlined), text: "Outline"),
              Tab(icon: Icon(Icons.beach_access_sharp), text: "Invisible"),
              Tab(icon: Icon(Icons.date_range), text: "Datepicker"),
              Tab(icon: Icon(Icons.camera), text: "Camera"),
            ],
          ),
        ),
        body: TabBarView(
          children: <Widget>[
            // First tab: widgets with outline
            Scrollbar(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: const <Widget>[
                    OutlineForm(
                      selected: false,
                    ),
                    SizedBox(height: 24),
                    MultiButton(
                        whichType: 0,
                        itemNames: <Widget>[
                          Text('Apple'),
                          Text('Banana'),
                          Text('Mango')
                        ],
                        color: Colors.green,
                        visible: true),
                    SizedBox(height: 24),
                    MultiButton(
                        whichType: 1,
                        itemNames: <Widget>[
                          Text('Rainy'),
                          Text('Sunny'),
                          Text('Windy')
                        ],
                        color: Colors.pink,
                        visible: true),
                  ],
                ),
              ),
            ),
            // ignore: prefer_const_constructors
            // Second tab: widgets with invisible outline
            Scrollbar(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: const <Widget>[
                    NoOutlineForm(
                      selected: false,
                    ),
                    SizedBox(height: 24),
                    MultiButton(
                        whichType: 0,
                        itemNames: <Widget>[
                          Text('Apple'),
                          Text('Banana'),
                          Text('Mango')
                        ],
                        color: Colors.green,
                        visible: false),
                    SizedBox(height: 24),
                    MultiButton(
                        whichType: 1,
                        itemNames: <Widget>[
                          Text('Rainy'),
                          Text('Sunny'),
                          Text('Windy')
                        ],
                        color: Colors.pink,
                        visible: false),
                  ],
                ),
              ),
            ),
            // ignore: prefer_const_constructors
            Scrollbar(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: const <Widget>[
                    SizedBox(height: 30),
                    SizedBox(
                      width: 2000,
                      height: 1000,
                      child: FormWidgetsDemo(),
                    ),
                    SizedBox(height: 24)
                  ],
                ),
              ),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: const [
                SizedBox(height: 30),
                Expanded(child: SimpleCamera()),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
