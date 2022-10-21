import 'package:flutter/material.dart';

class MultiButton extends StatefulWidget {
  final int whichType;
  final List<Widget> itemNames;
  final MaterialColor color;
  final bool visible;

  const MultiButton({
    super.key,
    required this.whichType,
    required this.visible,
    required this.itemNames,
    required this.color,
  });

  @override
  State<MultiButton> createState() => _MultiButtonState();
}

class _MultiButtonState extends State<MultiButton> {
  final List<bool> _selectedFruits = <bool>[true, false, false];

  void singleSelect(int index) {
    for (int i = 0; i < _selectedFruits.length; i++) {
      _selectedFruits[i] = i == index;
    }
  }

  void multiSelect(int index) {
    _selectedFruits[index] = !_selectedFruits[index];
  }

  @override
  Widget build(BuildContext context) {
    return ToggleButtons(
      direction: Axis.horizontal,
      onPressed: (int index) {
        setState(() {
          if (widget.whichType == 0) {
            singleSelect(index);
          } else {
            multiSelect(index);
          }
        });
      },
      borderColor: widget.visible ? Colors.black : Colors.white,
      borderRadius: const BorderRadius.all(Radius.circular(8)),
      selectedBorderColor: widget.color[700],
      selectedColor: Colors.white,
      fillColor: widget.color[200],
      color: Colors.black,
      constraints: const BoxConstraints(
        minHeight: 40.0,
        minWidth: 80.0,
      ),
      isSelected: _selectedFruits,
      children: widget.itemNames,
    );
  }
}
