// ignore_for_file: library_private_types_in_public_api, depend_on_referenced_packages

import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Why Weight'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  DateTime _selectedDate = DateTime.now();

  bool isSameDay(DateTime date1, DateTime date2) {
    return date1.year == date2.year && date1.month == date2.month && date1.day == date2.day;
  }

  List<String> breakfastItems = [];
  List<String> lunchItems = [];
  List<String> dinnerItems = [];
  List<String> snackItems = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Center(child: Text(widget.title)), // Center the title
      ),
      body: Column(
        children: <Widget>[
          Expanded( 
            child: Container(
              margin: const EdgeInsets.all(10.0),
              decoration: BoxDecoration(
                border: Border.all(color: const Color.fromARGB(255, 245, 246, 247)),
                borderRadius: BorderRadius.circular(10.0),
              ),
              child: Align(
                alignment: Alignment.topCenter,
                child: Column(
                  children: [
                    _buildMealBlock('Breakfast', breakfastItems),
                    _buildMealBlock('Lunch', lunchItems),
                    _buildMealBlock('Dinner', dinnerItems),
                    _buildMealBlock('Snacks', snackItems),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMealBlock(String title, List<String> items) {
    return ExpansionTile(
      title: Text(
        title,
        style: TextStyle(fontSize: 16.0),
      ),
      children: [
        ListView.builder(
          shrinkWrap: true,
          itemCount: items.length,
          itemBuilder: (BuildContext context, int index) {
            return ListTile(
              title: Text(items[index]),
            );
          },
        ),
        ElevatedButton(
          onPressed: () {
            _showAddItemDialog(title, items);
          },
          child: Text('Add Item'),
        ),
      ],
    );
  }

  void _showAddItemDialog(String title, List<String> items) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        String newItem = '';
        return AlertDialog(
          title: Text('Add Item'),
          content: TextField(
            onChanged: (value) {
              newItem = value;
            },
          ),
          actions: [
            TextButton(
              onPressed: () {
                setState(() {
                  items.add(newItem);
                });
                Navigator.of(context).pop();
              },
              child: Text('Add'),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text('Cancel'),
            ),
          ],
        );
      },
    );
  }
}
