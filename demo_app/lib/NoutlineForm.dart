import 'package:flutter/material.dart';
import 'SelectableButton.dart';

// ignore: must_be_immutable
class NoOutlineForm extends StatefulWidget {
  final bool selected;

  const NoOutlineForm({super.key, required this.selected});

  @override
  // ignore: library_private_types_in_public_api
  State<NoOutlineForm> createState() => _NoOutlineFormState();
}

class _NoOutlineFormState extends State<NoOutlineForm>
    with AutomaticKeepAliveClientMixin<NoOutlineForm> {
  var nameController = TextEditingController();
  var emailController = TextEditingController();
  var addressController = TextEditingController();
  bool selected = false;
  showAlertDialog(BuildContext context) {
    // set up the buttons
    Widget cancelButton = TextButton(
      child: const Text("Refuse"),
      onPressed: () => Navigator.pop(context),
    );
    Widget continueButton = TextButton(
      child: const Text("Accept"),
      onPressed: () => Navigator.pop(context),
    );

    // set up the AlertDialog
    AlertDialog alert = AlertDialog(
      title: const Text("Notice"),
      content: const Text("Stay hydrated!\nDrink 7 glasses of water a day."),
      actions: [
        cancelButton,
        continueButton,
      ],
    );

    // show the dialog
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return alert;
      },
    );
  }

  @override
  bool get wantKeepAlive => true;
  @override
  Widget build(BuildContext context) {
    super.build(context);
    return Scrollbar(
      child: SingleChildScrollView(
        restorationId: 'text_field_demo_scroll_view',
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 16),
              child: TextFormField(
                controller: nameController,
                decoration: const InputDecoration(
                  border: UnderlineInputBorder(),
                  hintText: 'Enter your username',
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 16),
              child: TextFormField(
                controller: emailController,
                decoration: const InputDecoration(
                  border: UnderlineInputBorder(),
                  hintText: 'Enter your email',
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 16),
              child: TextFormField(
                controller: addressController,
                decoration: const InputDecoration(
                  border: UnderlineInputBorder(),
                  hintText: 'Enter your address',
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      TextButton(
                        child: const Text('Submit'),
                        onPressed: () {
                          showAlertDialog(context);
                        },
                      ),
                      const SizedBox(width: 10),
                      TextButton(
                        style: TextButton.styleFrom(
                          foregroundColor: Colors.grey,
                        ),
                        onPressed: () {
                          nameController.clear();
                          emailController.clear();
                          addressController.clear();
                        },
                        child: const Text('reset'),
                      ),
                    ],
                  ),
                  // SelectableButton(
                  //   selected: selected,
                  //   style: ButtonStyle(
                  //     foregroundColor:
                  //         MaterialStateProperty.resolveWith<Color?>(
                  //       (Set<MaterialState> states) {
                  //         if (states.contains(MaterialState.selected)) {
                  //           return Colors.white;
                  //         }
                  //         return null; // defer to the defaults
                  //       },
                  //     ),
                  //     backgroundColor:
                  //         MaterialStateProperty.resolveWith<Color?>(
                  //       (Set<MaterialState> states) {
                  //         if (states.contains(MaterialState.selected)) {
                  //           return Colors.indigo;
                  //         }
                  //         return null; // defer to the defaults
                  //       },
                  //     ),
                  //   ),
                  //   onPressed: () {
                  //     setState(() {
                  //       selected = !selected;
                  //     });
                  //   },
                  //   child: const Text('toggle button'),
                  // ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
